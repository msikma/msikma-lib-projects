/**
 * redump-js - Redump Client Library <https://github.com/msikma/msikma-lib-projects>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

import parse from 'm-common/scrape'
import { STATUS_COLORS } from './static'

/**
 * Parses a browse or search page. Both of these have the same format.
 * Each entry contains a small amount of data.
 */
export const parseBrowsePage = (html) => {
  const $ = parse(html)
  const items = $('.gamesblock .games tr')
  const results = items.get().map(item => parseSingleResult($, item))
  return {
    results
  }
}

/**
 * Parses a full detail page containing a disc's complete information.
 */
export const parseDetailPage = (html) => {
  const $ = parse(html)

}

/**
 * Parses a single search result.
 */
const parseSingleResult = ($, item) => {
  const $item = $(item)

  // The title is inside an <a> tag with a link to the detail page.
  // Sometimes there's a subtitle which we need to remove first.
  const $title = $('td:nth-child(2) a', $item)
  const $subtitle = $('.small', $title)
  const subtitle = $subtitle.text().trim()
  $subtitle.remove()
  const title = $title.text().trim()
  // Grab the link to the detail page.
  const urlRe = $title.attr('href').match(/disc\/([0-9]+)\//)
  const url = urlRe ? urlRe[1] : null

  // Languages are displayed as flag images. We reduce them to an array of strings.
  const languages = $('td:nth-child(6) img', $item).get().map(l => $(l).attr('title').trim())

  // The rest of the items are plain text.
  const region = $('td:nth-child(1) img', $item).attr('src').trim()
  const system = $('td:nth-child(3)', $item).text().trim()
  const version = $('td:nth-child(4)', $item).text().trim()
  const edition = $('td:nth-child(5)', $item).text().trim()

  // Take the <td> item's 'title' attribute if it has one, else the inner text.
  // An item can have multiple serials.
  const $serial = $('td:nth-child(7)', $item)
  const serialTitle = $serial.attr('title').trim()
  const serialText = $serial.text().trim()
  const serialItems = serialTitle ? serialTitle : serialText
  const serial = serialItems.split(', ')

  // Status is determined by the image name.
  const statusImage = $('td:nth-child(8) img', $item).attr('src').trim()
  const statusRe = statusImage.match(/images\/status\/(.+?)\.png/)
  const status = statusRe && statusRe[1] ? STATUS_COLORS[statusRe[1]] : null

  return {
    title,
    subtitle,
    url,
    region,
    system,
    version,
    edition,
    status,
    serial,
    languages
  }
}
