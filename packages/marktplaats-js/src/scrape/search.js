// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { cheerio } from 'mlib-common/lib/scrape'
import { parseStatus, parseDelivery, parsePrice } from './util'
import { removeQuery } from 'mlib-common/lib/query'
import { searchURI } from './uris'
import requestURI from 'mlib-common/lib/request'

// Runs search page scraping code on the passed HTML string.
const scrapeResults = (html) => {
  const $ = cheerio.load(html)
  return getRealResults($)
}

// Retrieves all results from the result page minus any sponsored results that may be there.
const getRealResults = ($) => {
  const results = $('.search-results-table article.search-result:not(.bottom-listing)')
  return results.get().map(result => {
    try {
      const $result = $(result)
      const title = $('.heading', result).text().trim()
      const desc = $('.description > span', result).get().map(d => $(d).text().trim()).join(' ')
      const url = removeQuery($result.attr('data-url').trim())
      const id = $result.attr('data-item-id').trim()
      const priceRaw = $('.column-price .price-new', result).text().trim()
      const priceVals = parsePrice(priceRaw)
      const $listingAttributes = $('.listing-priority-product-container .mp-listing-attributes', result)
      const status = parseStatus($($listingAttributes[0]).text().trim())
      const delivery = parseDelivery($($listingAttributes[1]).text().trim())
      return {
        id,
        title,
        desc,
        url,
        ...priceVals,
        delivery,
        status
      }
    }
    catch (error) {
      // If something went wrong, skip only this result.
      return { errorType: 'PARSE_ERROR', error }
    }
  })
}

// Runs a search query, extracts the information, and then returns it.
const runSearch = async params => {
  const url = searchURI({ query: 'floppy', categoryID: 356 })
  const html = await requestURI(url)
  const data = scrapeResults(html)
  return {
    reqParams: params,
    reqURL: url,
    data
  }
}

export default runSearch
