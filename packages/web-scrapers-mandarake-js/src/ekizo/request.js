/**
 * mandarake-js - Mandarake Client Library <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma
 */

import requestURI from 'web-scrapers-common/utils/request'
import cookie from '../util/cookies'

import { fetchMandarakeAuctionSearch } from './scrape'

/**
 * This loads the auction URL's HTML and calls the parser to extract the info.
 */
export const getMandarakeAuctionSearch = async (url, searchDetails) => {
  const data = await requestURI(url, null, { jar: cookie.jar })
  return fetchMandarakeAuctionSearch(data.body, url, searchDetails)
}
