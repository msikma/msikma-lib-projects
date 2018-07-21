/**
 * mandarake-js - Mandarake Client Library <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma
 */

import { objToParams } from 'web-scrapers-common/utils/query'

// Domain for Mandarake auction site.
export const MANDARAKE_AUCTION_BASE = 'https://ekizo.mandarake.co.jp'
// The path in which all important pages are found.
export const MANDARAKE_AUCTION_PATH = `${MANDARAKE_AUCTION_BASE}/auction/item/`
// Mandarake auction index page.
export const MANDARAKE_AUCTION_INDEX = `${MANDARAKE_AUCTION_PATH}itemsListJa.html`

// Returns the URL for single item.
export const mandarakeAuctionObjectURL = id => `${MANDARAKE_AUCTION_INDEX}?index=${id}`

// Returns the URL for an auction search request.
export const mandarakeAuctionSearchURL = (searchDetails) => (
  `${MANDARAKE_AUCTION_INDEX}?${objToParams({ ...searchDetails })}`
)
