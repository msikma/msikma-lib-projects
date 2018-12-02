// ms-gmail-overview - Simple Gmail scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'

import cacheData, { retrieveCache } from 'mlib-common/lib/cache'
import requestURI, { loadCookieFile } from 'mlib-common/lib/request'
import { cheerio } from 'mlib-common/lib/scrape'

import { gmailHome } from './uris'

const listEmails = async (args) => {
  // Retrieve cache, unless the user specified not to use it.
  let data = args.no_cache ? null : (await retrieveCache(args.cache_loc, args.cache_time))
  if (!data) {
    data = await reqGmailData(args.cookie_loc)

    // Save to cache.
    await cacheData(data, args.cache_loc)

    return data
  }
  else {
    // Cached data has already been processed.
    return data
  }
}

// Retrieves all parsed Gmail data we're interested in.
const reqGmailData = async (cookieLoc) => {
  // Currently we only check the Gmail inbox.
  const data = await Promise.all([_scrapeGmailPage(_reqGmailInbox, 'inbox', cookieLoc, true)])
  return data
}

// Parses the HTML and returns all useful data from the page.
// This is used to parse every Gmail page, since they are all more or less the same.
// If 'getMetaData' is true, we'll return some extra info visible on the page.
export const scrapeData = ($, name, getMetaData = false) => {
  const tagTable = $('table.l')
  const data = {

  }

  if (getMetaData) {
    
    const meta = {

    }
    return { [name]: data, meta }
  }
  else {
    return { [name]: data }
  }
}

// Retrieves and processes a single Gmail URL.
// The 'fn' argument must be a reference to a function that retrieves HTML from Gmail.
// If 'getMetaData' is true, the parser will also attempt to retrieve metainfo,
// which is only necessary in one request.
const _scrapeGmailPage = async (fn, name, cookieLoc, getMetaData = false) => {
  // After we get the HTML, run it through the generic parsing code.
  const html = await fn(cookieLoc)
  const $html = cheerio.load(html)
  return scrapeData($html, name, getMetaData)
}

// Retrieves the Gmail inbox and parses its data.
const _reqGmailInbox = async (cookieLoc) => {
  const cookieFile = cookieLoc ? cookieLoc : path.normalize(path.join(process.env.HOME, '.config', 'ms-gmail-js', 'cookies.txt'))
  const cookieJar = await loadCookieFile(cookieFile)
  const html = await requestURI(gmailHome(), false, {}, false, { jar: cookieJar })
  return html
}

export default listEmails
