'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = exports.runSearch = exports.makeSearchURL = exports.defaults = exports.queryDefaults = exports.BUYEE_RECOMMENDED = exports.WITH_PICTURES = exports.WITH_BUYOUT = exports.FREE_DELIVERY_IN_JAPAN = exports.NEWLY_LISTED = exports.INDIVIDUAL_SELLER = exports.STORE = exports.USED_ITEMS = exports.NEW_ITEMS = exports.ANY = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _options;

var _lodash = require('lodash');

var _query = require('web-scrapers-common/utils/query');

var _uris = require('./uris');

var _scrape = require('./scrape');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
                                                                                                                                                                                                                   * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                   */

/** Constants for use in search objects. */
// Item status:
var ANY = exports.ANY = 'any';
var NEW_ITEMS = exports.NEW_ITEMS = 'new';
var USED_ITEMS = exports.USED_ITEMS = 'used';
// Store type:
var STORE = exports.STORE = 'store';
var INDIVIDUAL_SELLER = exports.INDIVIDUAL_SELLER = 'individualSeller';
// Options:
var NEWLY_LISTED = exports.NEWLY_LISTED = 'newlyListed';
var FREE_DELIVERY_IN_JAPAN = exports.FREE_DELIVERY_IN_JAPAN = 'freeDeliveryInJapan';
var WITH_BUYOUT = exports.WITH_BUYOUT = 'withBuyout';
var WITH_PICTURES = exports.WITH_PICTURES = 'withPictures';
var BUYEE_RECOMMENDED = exports.BUYEE_RECOMMENDED = 'buyeeRecommended';

// Default values for a search query: this can include regular search terms,
// search phrases, and terms that are excluded.
// E.g.: all words (any words) -words -to -be -excluded
var queryDefaults = exports.queryDefaults = {
  terms: '',
  phrase: '',
  excluded: ''

  // Default settings for every search.
};var defaults = exports.defaults = {
  currentPriceRange: { min: null, max: null },
  buyoutPriceRange: { min: null, max: null },
  itemStatus: ANY,
  storeType: ANY,
  options: (_options = {}, _defineProperty(_options, NEWLY_LISTED, false), _defineProperty(_options, FREE_DELIVERY_IN_JAPAN, false), _defineProperty(_options, WITH_BUYOUT, false), _defineProperty(_options, WITH_PICTURES, false), _defineProperty(_options, BUYEE_RECOMMENDED, false), _options)

  /**
   * Returns a search URL containing the user's desired results.
   *
   * This converts our own API's object format into URLs that Buyee will accept.
   * The query, category and seller name (if any) are added to the path (form encoded)
   * and everything else is turned into a query string.
   */
};var makeSearchURL = exports.makeSearchURL = function makeSearchURL(search) {
  // Merge in the default object structure.
  var _merge = (0, _lodash.merge)(defaults, search),
      query = _merge.query,
      category = _merge.category,
      seller = _merge.seller,
      currentPriceRange = _merge.currentPriceRange,
      buyoutPriceRange = _merge.buyoutPriceRange,
      itemStatus = _merge.itemStatus,
      storeType = _merge.storeType,
      options = _merge.options;

  // The query, category and seller values are set in the path instead of in the query string.
  // Buyee normally searches by a POST to a form field with application/x-www-form-urlencoded
  // and it expects spaces to be converted to plus characters.


  var queryPath = query ? '/query/' + (0, _query.toFormURIComponent)(encodeURIComponent(markupQuery(query))) : '';
  var categoryPath = category ? '/category/' + (0, _query.toFormURIComponent)(encodeURIComponent(category)) : '';
  var sellerPath = seller ? '/seller/' + (0, _query.toFormURIComponent)(encodeURIComponent(seller)) : '';

  // Construct the rest of the query parameters. If no extra search parameters
  // are set, we will end up with an empty query string.
  var qsParameters = {};
  if (currentPriceRange.min) qsParameters['aucminprice'] = currentPriceRange.min;
  if (currentPriceRange.max) qsParameters['aucmaxprice'] = currentPriceRange.max;
  if (buyoutPriceRange.min) qsParameters['aucmin_bidorbuy_price'] = buyoutPriceRange.min;
  if (buyoutPriceRange.max) qsParameters['aucmax_bidorbuy_price'] = buyoutPriceRange.max;

  if (itemStatus === NEW_ITEMS) qsParameters['item_status'] = 1;
  if (itemStatus === USED_ITEMS) qsParameters['item_status'] = 2;

  if (storeType === STORE) qsParameters['store'] = 1;
  if (storeType === INDIVIDUAL_SELLER) qsParameters['store'] = 2;

  if (options[NEWLY_LISTED]) qsParameters['new'] = 1;
  if (options[FREE_DELIVERY_IN_JAPAN]) qsParameters['freeshipping'] = 1;
  if (options[WITH_BUYOUT]) qsParameters['buynow'] = 1;
  if (options[WITH_PICTURES]) qsParameters['thumbnail'] = 1;
  if (options[BUYEE_RECOMMENDED]) qsParameters['goodSellers'] = 1;

  // Convert the parameters to a query string.
  var queryString = (0, _query.objToParams)(qsParameters);

  // Combine all elements into one URI with the path sections in the right order.
  return (0, _uris.searchURI)([queryPath, categoryPath, sellerPath, queryString ? '?' : '', queryString].join(''));
};

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
var markupQuery = function markupQuery(queryObj) {
  // Return strings verbatim.
  if ((0, _lodash.isString)(queryObj)) return queryObj;

  // Merge in the defaults and trim them.
  var items = (0, _lodash.mapValues)((0, _lodash.merge)(queryDefaults, queryObj), function (str) {
    return str.trim();
  });
  return [items.terms, items.phrase ? '(' + items.phrase + ')' : '',
  // Split excluded terms by any whitespace, add a minus and rejoin with a single space.
  items.excluded ? items.excluded.match(/\S+/g).map(function (item) {
    return '-' + item;
  }).join(' ') : ''].join('');
};

/**
 * Runs a search on Buyee and returns the results as Product objects.
 */
var runSearch = exports.runSearch = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
    var url, _ref2, items, metadata, results;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = makeSearchURL(params);
            _context.next = 3;
            return (0, _scrape.fetchSearchData)(url);

          case 3:
            _ref2 = _context.sent;
            items = _ref2.items;

            console.log(items);
            process.exit(0);
            metadata = { searchURL: url, searchParameters: params };
            results = items.map(function (item) {
              return new Product(item, metadata, false);
            });
            return _context.abrupt('return', _extends({ results: results }, metadata));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function runSearch(_x) {
    return _ref.apply(this, arguments);
  };
}();

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

var Product = exports.Product = function () {
  function Product(data, _ref3) {
    var _ref3$searchURL = _ref3.searchURL,
        searchURL = _ref3$searchURL === undefined ? null : _ref3$searchURL,
        _ref3$searchParameter = _ref3.searchParameters,
        searchParameters = _ref3$searchParameter === undefined ? null : _ref3$searchParameter;
    var extendedData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Product);

    /** Product data: can be either simple data (from a search result) or extended data. */
    this.data = data;
    /** The product's ID string: e.g. 'f280343248'. */
    this.id = data.id;
    this.searchURL = searchURL;
    this.searchParameters = searchParameters;

    // Whether this item has extended data (data from its detail page) loaded.
    this.hasExtendedData = extendedData;
  }
  /**
   * Fetches extended data for an object. See note above on throttling.
   * If we already have the extended data this does nothing.
   */


  _createClass(Product, [{
    key: 'fetchExtendedData',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var refetch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var url, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.hasExtendedData && !refetch)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                url = (0, _uris.auctionURI)(this.id);
                _context2.next = 5;
                return (0, _scrape.fetchProductData)(url);

              case 5:
                data = _context2.sent;

                this.data = _extends({}, this.data, data);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchExtendedData() {
        return _ref4.apply(this, arguments);
      }

      return fetchExtendedData;
    }()
    /** Redoes the original extended data call again to update the data. */

  }, {
    key: 'refreshExtendedData',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', this.fetchExtendedData(true));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function refreshExtendedData() {
        return _ref5.apply(this, arguments);
      }

      return refreshExtendedData;
    }()
    /** Returns the original auction URI, e.g. <https://page.auctions.yahoo.co.jp/jp/auction/id>. */

  }, {
    key: 'getOriginalAuction',
    value: function getOriginalAuction() {
      return (0, _uris.originalAuctionURI)(this.id);
    }
    /** Returns a link to this item's seller's page on Buyee. */

  }, {
    key: 'getSeller',
    value: function getSeller() {
      return makeSearchURL({ seller: this.data.seller });
    }
  }]);

  return Product;
}();
