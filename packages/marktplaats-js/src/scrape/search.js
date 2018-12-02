// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { cheerio } from 'mlib-common/lib/scrape'
import { removeQuery } from 'mlib-common/lib/query'
import requestURI from 'mlib-common/lib/request'

import { parseStatus, parseDelivery, parsePrice } from './util'
import { searchURI, makeURILocal } from './uris'

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
      const urlLocal = makeURILocal(url)
      const id = $result.attr('data-item-id').trim()
      const priceRaw = $('.column-price .price-new', result).text().trim()
      const priceVals = parsePrice(priceRaw)
      const $listingAttributes = $('.listing-priority-product-container .mp-listing-attributes', result)
      const status = parseStatus($($listingAttributes[0]).text().trim())
      const delivery = parseDelivery($($listingAttributes[1]).text().trim())
      const location = $('.location-name', result).text().trim()
      const $seller = $('.seller-name a', result)
      const seller = {
        name: $seller.text().trim(),
        url: $seller.attr('href').trim()
      };
      return {
        id,
        title,
        desc,
        url,
        urlLocal,
        location,
        ...priceVals,
        seller,
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
  const url = searchURI(params)
  const html = await requestURI(url)
  const data = scrapeResults(html)
  return {
    reqParams: params,
    reqURL: url,
    data
  }
}

export default runSearch
