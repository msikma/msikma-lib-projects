/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

import { cloneDeep, get, set, pick } from 'lodash'
import { defaults as searchDefaults } from '../yahoo-auction/search'

// List of source and destination paths for converting from CLI format to API format.
const cliToParams = [
  ['query', 'query'],
  ['category', 'category'],
  ['seller', 'seller'],
  ['price_min', 'currentPriceRange.min'],
  ['price_max', 'currentPriceRange.max'],
  ['buyout_min', 'buyoutPriceRange.min'],
  ['buyout_max', 'buyoutPriceRange.max'],
  ['item_status', 'itemStatus'],
  ['store_type', 'storeType']
]
// Miscellaneous options.
const cliToParamOptions = [
  'withBuyout',
  'newlyListed',
  'freeDeliveryInJapan',
  'withPictures',
  'buyeeRecommended'
]
// List of paths to convert to number.
const cliNumberParams = [
  'currentPriceRange.min',
  'currentPriceRange.max',
  'buyoutPriceRange.min',
  'buyoutPriceRange.max'
]

/**
 * Converts arguments from the command line argparse module to a proper search object.
 * The object contains roughly the following items:
 *
 *   { action: 'search',
 *     output: 'json',
 *     query: 'one piece',
 *     category: '20060',
 *     seller: 'resyk19',
 *     price_min: '800',
 *     price_max: '1500',
 *     buyout_min: '340',
 *     buyout_max: '500000',
 *     item_status: 'any',
 *     store_type: 'any',
 *     withBuyout: true,
 *     newlyListed: true,
 *     freeDeliveryInJapan: true,
 *     withPictures: false,
 *     buyeeRecommended: false }
 *
 * We will return this data in the following format:
 *
 *   { currentPriceRange: { min: 800, max: 1500 },
 *     buyoutPriceRange: { min: 340, max: 500000 },
 *     itemStatus: 'any',
 *     storeType: 'any',
 *     options:
 *      { withBuyout: true,
 *        newlyListed: true,
 *        freeDeliveryInJapan: true,
 *        withPictures: false,
 *        buyeeRecommended: false },
 *     query: 'one piece',
 *     category: '20060',
 *     seller: 'resyk19' }
 */
export const cliToAPIArgs = cliParams => {
  const params = cloneDeep(searchDefaults)

  // Bring over every parameter from the source/destination mapping.
  let from
  for (let fromTo of cliToParams) {
    from = get(cliParams, fromTo[0])
    if (from) {
      set(params, fromTo[1], from)
    }
  }

  // Set the miscellaneous search options object.
  set(params, 'options', pick(cliParams, cliToParamOptions))

  // Convert some parameters to numbers.
  let value
  for (let path of cliNumberParams) {
    value = get(params, path, null)
    set(params, path, value ? Number(value) : value)
  }

  return params
}

/**
 * Outputs the data from a search result (or really, any kind of data).
 */
export const outputData = (data, format = 'json') => {
  if (format === 'json') {
    return console.log(JSON.stringify(wrapOutputData(data)))
  }
}

// Ensures the result data is at least an empty object and is wrapped in 'result'.
const wrapOutputData = (result = {}) => ({
  result
})
