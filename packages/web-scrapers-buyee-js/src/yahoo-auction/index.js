/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

import { runSearch } from './search'

class YahooAuction {
  constructor() {
    // Last search the user ran.
    this.lastSearchURL = null
    this.lastSearch = null
    // Results from the last search.
    this.results = null
  }
  /** Runs a search on Yahoo Japan Auction and returns the results as Product objects. */
  async search(searchObj) {
    const { results, searchURL } = await runSearch(searchObj)

    this.lastSearchURL = searchURL
    this.lastSearch = searchObj
    this.results = results

    return results
  }
}

export default YahooAuction
