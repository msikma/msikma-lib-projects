// buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { merge, mapValues, isString } from 'lodash'
import { objToParams, toFormURIComponent } from 'mlib-common/lib/query'

import { searchURI, originalAuctionURI, auctionURI } from './uris'
import { fetchSearchData, fetchProductData } from './scrape'

/** Constants for use in search objects. */
// Item status:
export const ANY = 'any'
export const NEW_ITEMS = 'new'
export const USED_ITEMS = 'used'
// Store type:
export const STORE = 'store'
export const INDIVIDUAL_SELLER = 'individualSeller'
// Options:
export const NEWLY_LISTED = 'newlyListed'
export const FREE_DELIVERY_IN_JAPAN = 'freeDeliveryInJapan'
export const WITH_BUYOUT = 'withBuyout'
export const WITH_PICTURES = 'withPictures'
export const BUYEE_RECOMMENDED = 'buyeeRecommended'

// Default values for a search query: this can include regular search terms,
// search phrases, and terms that are excluded.
// E.g.: all words (any words) -words -to -be -excluded
export const queryDefaults = {
  terms: '',
  phrase: '',
  excluded: ''
}

// Default settings for every search.
export const defaults = {
  currentPriceRange: { min: null, max: null },
  buyoutPriceRange: { min: null, max: null },
  itemStatus: ANY,
  storeType: ANY,
  options: {
    [NEWLY_LISTED]: false,
    [FREE_DELIVERY_IN_JAPAN]: false,
    [WITH_BUYOUT]: false,
    [WITH_PICTURES]: false,
    [BUYEE_RECOMMENDED]: false
  }
}

/**
 * Returns a search URL containing the user's desired results.
 *
 * This converts our own API's object format into URLs that Buyee will accept.
 * The query, category and seller name (if any) are added to the path (form encoded)
 * and everything else is turned into a query string.
 */
export const makeSearchURL = search => {
  // Merge in the default object structure.
  const {
    // Search query (a string, or { terms: '', phrase: '', excluded: '' })
    query,
    // Category ID (a number or a string containing a number)
    category,
    // Seller username (a string)
    seller,
    // Current price range (min, max)
    currentPriceRange,
    // Buyout price range (min, max)
    buyoutPriceRange,
    // Item status (new items only, used items only, or any)
    itemStatus,
    // Store type (commercial store, individual seller, or any)
    storeType,
    // Additional options: newly posted, free delivery within Japan, with buyout price, with picture, Buyee recommended
    options
  } = merge(defaults, search)

  // The query, category and seller values are set in the path instead of in the query string.
  // Buyee normally searches by a POST to a form field with application/x-www-form-urlencoded
  // and it expects spaces to be converted to plus characters.
  const queryPath = query ? `/query/${toFormURIComponent(encodeURIComponent(markupQuery(query)))}` : ''
  const categoryPath = category ? `/category/${toFormURIComponent(encodeURIComponent(category))}` : ''
  const sellerPath = seller ? `/seller/${toFormURIComponent(encodeURIComponent(seller))}` : ''

  // Construct the rest of the query parameters. If no extra search parameters
  // are set, we will end up with an empty query string.
  const qsParameters = {}
  if (currentPriceRange.min) qsParameters['aucminprice'] = currentPriceRange.min
  if (currentPriceRange.max) qsParameters['aucmaxprice'] = currentPriceRange.max
  if (buyoutPriceRange.min) qsParameters['aucmin_bidorbuy_price'] = buyoutPriceRange.min
  if (buyoutPriceRange.max) qsParameters['aucmax_bidorbuy_price'] = buyoutPriceRange.max

  if (itemStatus === NEW_ITEMS) qsParameters['item_status'] = 1
  if (itemStatus === USED_ITEMS) qsParameters['item_status'] = 2

  if (storeType === STORE) qsParameters['store'] = 1
  if (storeType === INDIVIDUAL_SELLER) qsParameters['store'] = 2

  if (options[NEWLY_LISTED]) qsParameters['new'] = 1
  if (options[FREE_DELIVERY_IN_JAPAN]) qsParameters['freeshipping'] = 1
  if (options[WITH_BUYOUT]) qsParameters['buynow'] = 1
  if (options[WITH_PICTURES]) qsParameters['thumbnail'] = 1
  if (options[BUYEE_RECOMMENDED]) qsParameters['goodSellers'] = 1

  // Convert the parameters to a query string.
  const queryString = objToParams(qsParameters)

  // Combine all elements into one URI with the path sections in the right order.
  return searchURI([queryPath, categoryPath, sellerPath, queryString ? '?' : '', queryString].join(''))
}

/**
 * Returns a query string that can be used in a searchURL() object.
 *
 * The input must be either an object containing zero or more of {'terms', 'phrase', 'excluded'},
 * each value being a string; or a string, which is returned verbatim.
 *
 * The user is able to search for regular search terms, search phrases and excluded terms.
 * A phrase is wrapped in parentheses and excluded terms are prefixed with a minus.
 * Excluded terms are additionally split on whitespace and rejoined on a single space;
 * all/any are not.
 */
const markupQuery = queryObj => {
  // Return strings verbatim.
  if (isString(queryObj)) return queryObj

  // Merge in the defaults and trim them.
  const items = mapValues(merge(queryDefaults, queryObj), str => str.trim())
  return [
    items.terms,
    items.phrase ? `(${items.phrase})` : '',
    // Split excluded terms by any whitespace, add a minus and rejoin with a single space.
    items.excluded ? items.excluded.match(/\S+/g).map(item => `-${item}`).join(' ') : ''
  ].join('')
}

/**
 * Runs a search on Buyee and returns the results as Product objects.
 */
export const runSearch = async params => {
  const url = makeSearchURL(params)
  const { items } = await fetchSearchData(url)
  console.log(items);
  process.exit(0)
  const metadata = { searchURL: url, searchParameters: params }
  const results = items.map(item => new Product(item, metadata, false))
  return { results, ...metadata }
}

/**
 * Container for Yahoo Japan Auction products.
 *
 * This contains the data we retrieved from scraping the page and a number of simple convenience functions.
 * The data may either be simple or extended -- the latter is when we have finished scraping the product's
 * detail page, which is not done automatically due to the high amount of requests it may generate.
 *
 * Retrieving extra data should always be done with throttling, both out of respect to the host and to
 * prevent Node from generating temporary network errors, which can happen easily if sending out
 * too many requests at the same time.
 */
export class Product {
  constructor(data, { searchURL = null, searchParameters = null }, extendedData = false) {
    /** Product data: can be either simple data (from a search result) or extended data. */
    this.data = data
    /** The product's ID string: e.g. 'f280343248'. */
    this.id = data.id
    this.searchURL = searchURL
    this.searchParameters = searchParameters

    // Whether this item has extended data (data from its detail page) loaded.
    this.hasExtendedData = extendedData
  }
  /**
   * Fetches extended data for an object. See note above on throttling.
   * If we already have the extended data this does nothing.
   */
  async fetchExtendedData(refetch = false) {
    if (this.hasExtendedData && !refetch) return
    const url = auctionURI(this.id)
    const data = await fetchProductData(url)
    this.data = { ...this.data, ...data }
  }
  /** Redoes the original extended data call again to update the data. */
  async refreshExtendedData() {
    return this.fetchExtendedData(true)
  }
  /** Returns the original auction URI, e.g. <https://page.auctions.yahoo.co.jp/jp/auction/id>. */
  getOriginalAuction() {
    return originalAuctionURI(this.id)
  }
  /** Returns a link to this item's seller's page on Buyee. */
  getSeller() {
    return makeSearchURL({ seller: this.data.seller })
  }
}
