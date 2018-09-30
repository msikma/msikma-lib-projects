// buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

// Buyee base URI: accepts both http and https, but we'll use exclusively https.
export const BASE_URI = 'https://buyee.jp'
export const BASE_URI_HTTP = 'http://buyee.jp'

// Base search URI. Don't call directly; use searchURL() from './search' instead.
export const searchURI = path => `${BASE_URI}/item/search${path}`

// Product detail page URI. All products here are auctions.
export const auctionURI = id => `${BASE_URI}/item/yahoo/auction/${id}`

// Link to the original Yahoo auctions page by the item's ID.
export const originalAuctionURI = id => `https://page.auctions.yahoo.co.jp/jp/auction/${id}`

/**
 * Ensures a URI is fully qualified. E.g. adds the base URI to '/item/yahoo/auction/f280343248'.
 * Also ensures https. We assume that, if not fully qualified, the URI does start with a slash.
 */
export const ensureFullURI = uri => {
  // TODO: Make sure this isn't accidentally some totally other link.

  // Just make absolutely sure we have https. Does nothing if it's not a full URI.
  const httpsURI = ensureHTTPS(uri)
  // Now check if we need to add the base URI.
  return httpsURI.startsWith(BASE_URI) ? httpsURI : `${BASE_URI}${httpsURI}`
}

export const ensureHTTPS = uri => (
  uri.startsWith('https:') ? uri : uri.replace(/^http:/, 'https:')
)
