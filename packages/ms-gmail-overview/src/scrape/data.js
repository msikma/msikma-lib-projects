// ms-gmail-overview - Simple Gmail scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'

import cacheData, { retrieveCache } from 'mlib-common/lib/cache'
import requestURI, { loadCookieFile } from 'mlib-common/lib/request'
import { cheerio } from 'mlib-common/lib/scrape'

import { gmailHome } from './uris'

// Used for parsing Gmail date strings.
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// Separators used in Gmail time strings and in previews.
const nbsp = '\u00A0'

/** Retrieves the contents of the Gmail inbox as an object. */
export const getInbox = async (args) => {
  // Retrieve cache, unless the user specified not to use it.
  const data = args.no_cache || args.cache_only ? null : (await retrieveCache(args.cache_loc, args.cache_time))
  if (data) {
    // Cached data has already been processed.
    return data
  }
  // Get new data and save it to cache, unless an error was returned.
  const newData = await reqGmailData(args.cookie_loc)
  if (!newData.error) {
    await cacheData(newData, args.cache_loc)
  }
  return newData
}

// Retrieves all parsed Gmail data we're interested in.
const reqGmailData = async (cookieLoc) => {
  // Currently we only check the Gmail inbox.
  const data = await Promise.all([_scrapeGmailPage(_reqGmailInbox, 'inbox', cookieLoc, true)])
  return data[0]
}

// Changes a time string from e.g. '6:02 pm' or 'Aug 6' into a timestamp.
const timeStrToTs = (timeStr) => {
  let date = new Date()
  const currMonth = date.getMonth()
  const hasPM = ~timeStr.indexOf('pm')
  const hasAM = ~timeStr.indexOf('am')

  // Check if it's a time only string or a date only string.
  if (hasPM || hasAM) {
    // Split into hours and minutes.
    const split = timeStr.split(nbsp)[0].split(':')
    // Add 12 if the time is in the afternoon.
    date.setHours(Number(split[0]) + (hasPM ? 12 : 0))
    date.setMinutes(split[1])
    date.setSeconds(0)
  }
  else {
    // The month will be indicated with a three-letter name, e.g. 'Aug'.
    const split = timeStr.split(nbsp)
    const month = months.indexOf(split[0])
    // If the month is higher than the current month (e.g. Dec vs today's Jan)
    // we'll assume that this was from last year.
    const isLastYear = month < currMonth
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMonth(month)
    date.setDate(split[1])
    date.setFullYear(date.getFullYear() - (isLastYear ? 1 : 0))
  }

  // Return Unix timestamp in seconds.
  return ((+date) / 1000) << 0
}

// Trims away zero-width non-joining characters (\u200c).
const trimMore = (previewStr) => (
  previewStr.split('\u200c').join('').trim()
)

// Parses the HTML and returns all useful data from the page.
// This is used to parse every Gmail page, since they are all more or less the same.
// If 'getMetaData' is true, we'll return some extra info visible on the page.
export const scrapeData = ($, name, cookieLoc, getMetaData = false) => {
  // Get the base href first so we can resolve all other links.
  const baseHref = $('base[href]').attr('href')
  const $mailTable = $('table.th')

  // Exit early if we don't have the mail table; we're probably not logged in.
  if ($mailTable.length === 0) {
    return {
      error: [1, `ms-gmail-cli: error: could not log in with the provided cookie file: ${cookieLoc}`]
    }
  }

  const $mailTRs = $('tr', $mailTable)
  const mails = $mailTRs.get().map(tr => {
    const read = $(tr).attr('bgcolor').trim() === '#ffffff'
    const $sender = $('td:nth-child(2)', tr)

    // Remove any '»' characters in the sender node.
    $('span.ar', $sender).remove()

    const $subjectA = $('td:nth-child(3) a', tr)

    const $tagsOuter = $('.ts font:nth-child(1)', tr)
    const tags = $('font', $tagsOuter).text().split(',').map(t => t.trim())
    $tagsOuter.remove()

    const $preview = $('.ts font', tr)
    const preview = trimMore($preview.text().trim().replace(/^-\s/, '').trim())
    $preview.remove()
    const subject = $subjectA.text().trim()

    const time = $('td:nth-child(4)', tr).text().trim()
    const link = $subjectA.attr('href').trim()
    const idMatch = link.match(/th=(.+?)\&v=/) || ''
    const id = idMatch ? idMatch[1] : '0'
    const sender = $sender.text().trim()

    const timestamp = timeStrToTs(time)

    return {
      id: id.trim(),
      timestamp,
      read,
      time,
      subject,
      link: `${baseHref}${link}`,
      sender,
      tags,
      preview
    }
  })
  const $tagsOpts = $('select[name="tact"] option[value^="ac_"]')
  const tags = $tagsOpts.get().map(t => {
    const $t = $(t)
    const tag = $t.attr('value')
    return tag.split('ac_').join('')
  })
  const data = {
    mails
  }

  if (getMetaData) {
    const meta = {
      tags: tags.sort(),
      tagsCount: tags.length,
      baseHref
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
  return scrapeData($html, name, cookieLoc, getMetaData)
}

// Retrieves the Gmail inbox and parses its data.
const _reqGmailInbox = async (cookieLoc) => {
  const cookieFile = cookieLoc ? cookieLoc : path.normalize(path.join(process.env.HOME, '.config', 'ms-gmail-js', 'cookies.txt'))
  const cookieJar = await loadCookieFile(cookieFile)
  const html = await requestURI(gmailHome(), false, {}, false, { jar: cookieJar })
  return html
}

export default getInbox
