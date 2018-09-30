// redump-js - Redump Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { requestURI } from 'm-common/request'
import { browseURL, detailURL, SEARCH_URL } from './urls'
import { parseBrowsePage, parseDetailPage } from './scrape'

/**
 * Returns browse results for a specific query.
 * E.g. http://redump.org/discs/region/Eu/letter/m/?page=2
 */
export const browse = async ({ system, letter, region, page }) => {
  const url = browseURL(system, letter, region, page)
  const html = await requestURI(url)
  return parseBrowsePage(html)
}

/**
 * Runs a search and returns the results in the same format as browse().
 * Sends a POST to http://redump.org/results/ with 'quicksearch' as argument.
 */
export const search = async (query) => {
  const form = { quicksearch: query }
  const html = await requestURI({ url: SEARCH_URL, form }, {}, { method: 'POST' })
  return parseBrowsePage(html)
}

/**
 * Returns full info for a specific disc by its ID.
 * E.g. http://redump.org/disc/26337/
 */
export const getDiscInfo = (id) => {
  const url = detailURL(id)
  const html = await requestURI(url)
  return parseDetailPage(html)
}
