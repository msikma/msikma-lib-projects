'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

// Buyee base URI: accepts both http and https, but we'll use exclusively https.
var BASE_URI = exports.BASE_URI = 'https://buyee.jp';
var BASE_URI_HTTP = exports.BASE_URI_HTTP = 'http://buyee.jp';

// Base search URI. Don't call directly; use searchURL() from './search' instead.
var searchURI = exports.searchURI = function searchURI(path) {
  return BASE_URI + '/item/search' + path;
};

// Product detail page URI. All products here are auctions.
var auctionURI = exports.auctionURI = function auctionURI(id) {
  return BASE_URI + '/item/yahoo/auction/' + id;
};

// Link to the original Yahoo auctions page by the item's ID.
var originalAuctionURI = exports.originalAuctionURI = function originalAuctionURI(id) {
  return 'https://page.auctions.yahoo.co.jp/jp/auction/' + id;
};

/**
 * Ensures a URI is fully qualified. E.g. adds the base URI to '/item/yahoo/auction/f280343248'.
 * Also ensures https. We assume that, if not fully qualified, the URI does start with a slash.
 */
var ensureFullURI = exports.ensureFullURI = function ensureFullURI(uri) {
  // TODO: Make sure this isn't accidentally some totally other link.

  // Just make absolutely sure we have https. Does nothing if it's not a full URI.
  var httpsURI = ensureHTTPS(uri);
  // Now check if we need to add the base URI.
  return httpsURI.startsWith(BASE_URI) ? httpsURI : '' + BASE_URI + httpsURI;
};

var ensureHTTPS = exports.ensureHTTPS = function ensureHTTPS(uri) {
  return uri.startsWith('https:') ? uri : uri.replace(/^http:/, 'https:');
};