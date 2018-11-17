// ms-gmail-overview - Simple Gmail scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'
import { cheerio } from 'mlib-common/lib/scrape'
import requestURI, { loadCookieFile } from 'mlib-common/lib/request'
import { gmailURL } from './uris'
import cacheTasks, { retrieveCache } from './cache'

const listEmails = async (args) => {
  // Retrieve cache, unless the user specified not to use it.
  let data2 = args.no_cache ? null : (await retrieveCache(args.cache_loc, args.cache_time))
  //
  const html = await reqEmailHomepage()
  console.log(html)
  const $ = cheerio.load(html)
  const data = scrapeData($)
  return data
}

const reqEmailHomepage = async () => {
  const cookieFile = path.normalize(path.join(process.env.HOME, '.config', 'ms-gmail-js', 'cookies.txt'))
  const cookieJar = await loadCookieFile(cookieFile)
  const html = await requestURI(gmailURL(), false, {}, false, { jar: cookieJar })
  return html
}

export const scrapeData = ($) => {
  return {}
}

export default listEmails
