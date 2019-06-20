// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018-2019, Michiel Sikma. MIT license.

import { cheerio } from 'mlib-common/lib/scrape'
import { removeQuery } from 'mlib-common/lib/query'
import requestURI from 'mlib-common/lib/request'
import { loadCategories } from '../categories'

import { parsePrice, separateAttributes, addHttps, hasOriginalThumb } from './util'
import { searchURI, apiSearchURI, makeShortLink, extractURIInfo } from './uris'

// Runs search page scraping code on the passed HTML string.
const scrapeResults = (html) => {
  const $ = cheerio.load(html, { decodeEntities: false })
  return getRealResults($)
}

// Retrieves all results from the result page minus any sponsored results that may be there.
const getRealResults = ($) => {
  const results = $('.search-results-table article.search-result:not(.bottom-listing)')
  return results.get().reduce((all, result) => {
    try {
      const $result = $(result)
      // Make sure this isn't an advertisement result.
      const priority = $('.mp-listing-priority-product', result).text().trim()
      if (priority === 'Topadvertentie') return all

      const title = $('.heading', result).text().trim()
      const desc = $('.description > span', result).get().map(d => $(d).text().trim()).join(' ')
      const url = removeQuery($result.attr('data-url').trim())
      const { slug } = extractURIInfo(url)
      const id = $result.attr('data-item-id').trim()
      const priceRaw = $('.column-price .price-new', result).text().trim()
      const priceVals = parsePrice(priceRaw)
      const $listingAttr = $('.listing-priority-product-container .mp-listing-attributes', result)
      const attributes = separateAttributes([$($listingAttr[0]).text().trim(), $($listingAttr[1]).text().trim()])
      const status = attributes['_status'] || null
      const delivery = attributes['_delivery'] || null
      const $thumb = $('.listing-image img', result)
      const thumbSrc = addHttps($thumb.attr('data-img-src'))
      const thumbAlt = addHttps($thumb.attr('src'))
      const thumb = thumbSrc ? thumbSrc.trim() : thumbAlt ? thumbAlt.trim() : null
      const hasImage = hasOriginalThumb(thumb)
      const location = $('.location-name', result).text().trim()
      const $seller = $('.seller-name a', result)
      const seller = {
        name: $seller.text().trim(),
        url: $seller.attr('href').trim()
      };
      return [...all, {
        id,
        slug,
        title,
        desc,
        url,
        urlShort: makeShortLink(id),
        location,
        ...priceVals,
        seller,
        delivery,
        status,
        thumb,
        hasImage
      }]
    }
    catch (error) {
      // If something went wrong, skip only this result.
      return { errorType: 'PARSE_ERROR', error }
    }
  }, [])
}

// Runs a search query using the Marktplaats API.
const listingSearchAPI = async params => {
  if (params.categoryID) {
    await loadCategories()
  }
  const url = await apiSearchURI(params)
  const json = await requestURI(url)
  const data = JSON.parse(json)
  return {
    reqParams: params,
    reqURL: url,
    data
  }
}

// Runs a search query using the regular Marktplaats web search page.
const listingSearchScrape = async params => {
  const url = searchURI(params)
  const html = await requestURI(url)
  const data = scrapeResults(html)
  return {
    reqParams: params,
    reqURL: url,
    data
  }
}

// Runs a search query, extracts the information, and then returns it.
const listingSearch = async params => {
  // Use either the regular search page or the API.
  return params._useScrapeSearch
    ? listingSearchScrape(params)
    : listingSearchAPI(params)
}

export default listingSearch
