'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapeProductPage = exports.fetchProductData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('web-scrapers-common/utils/request');

var _request2 = _interopRequireDefault(_request);

var _uris = require('../uris');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

/** 24 hours in ms. */
var ms24Hours = 86400000;

/**
 * A key/value table for turning Buyee's plain strings into JS camelCase names.
 * Also includes functions that will be used to transform some values.
 */
var detailTableTransform = {
  'Quantity': ['itemQuantity', Number],
  'Item Condition': ['itemCondition', _helpers.filterItemCondition],

  'Opening Price': ['openingPrice', _helpers.filterPrice],
  'Number of Bids': ['numberOfBids', Number],
  'Highest Bidder': ['highestBidder', function (bidder) {
    return bidder ? bidder : null;
  }],

  'Opening Time　(JST)': ['openingTime', _helpers.parseDateJST],
  'Closing Time　(JST)': ['closingTime', _helpers.parseDateJST],
  'Current Time　(JST)': ['currentTime', _helpers.parseDateJST],

  // If true, the seller can end the auction early at their discretion.
  'Early Finish': ['earlyFinish', _helpers.filterBoolean],
  // Extends the auction by 5 minutes each time the highest bid comes within the last 5 minutes.
  'Automatic Extension': ['automaticExtension', _helpers.filterBoolean],
  // If true, the seller has set restrictions (based on feedback score/rating) for who can/cannot bid.
  'Seller Rating Restriction': ['sellerRatingRestriction', _helpers.filterBoolean],
  'Shipping Paid By': ['shippingPaidBy', _helpers.filterShippingPayment]

  /** Retrieves HTML from a product's detail page and returns its extended info. */
};var fetchProductData = exports.fetchProductData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var html, $html;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _request2.default)(url);

          case 2:
            html = _context.sent;
            $html = _cheerio2.default.load(html);
            return _context.abrupt('return', scrapeProductPage($html, url));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchProductData(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Scrapes a product page and returns information found there.
 */
var scrapeProductPage = exports.scrapeProductPage = function scrapeProductPage($, url) {
  var id = (0, _helpers.getIDFromURL)(url);
  var title = $('#itemHeader h1').text().trim();

  // Return an array of all categories for this item.
  var cats = $('.cat_navi a').get().map(function (cat) {
    var $cat = $(cat);
    var url = (0, _uris.ensureFullURI)($cat.attr('href'));
    var id = (0, _helpers.getIDFromURL)(url);
    var name = $cat.text().trim();
    return {
      name: name,
      id: id,
      url: url
    };
  });

  // Retrieve all info from the item data table.
  var itemDetailTable = $('#itemDetail_data li').get().reduce(function (data, item) {
    // Add the cleaned up key name to the data list.
    var keyString = $('em', item).text().trim();
    if (!detailTableTransform[keyString]) return data;
    var key = detailTableTransform[keyString][0];
    // If applicable, run the value through a cleanup function.
    var valueString = $('span', item).text().trim();
    var valueFn = detailTableTransform[keyString][1];

    return _extends({}, data, _defineProperty({}, key, valueFn ? valueFn(valueString) : valueString));
  }, {});

  // Retrieve the current price and buyout price.
  var currentPrice = (0, _helpers.filterPrice)($('.current_price .current_price_output em').text().trim());
  var buyoutPrice = (0, _helpers.filterPrice)($('.current_price .snaipe_price em').text().trim());

  // Calculate number of seconds to closing time.
  var openingTime = itemDetailTable.openingTime.getTime();
  var currentTime = itemDetailTable.currentTime.getTime();
  var closingTime = itemDetailTable.closingTime.getTime();
  var timeRemaining = (closingTime - currentTime) / 1000;

  // A listing is considered 'newly listed' if less than 24 hours has passed since its opening.
  var isNewlyListed = currentTime - openingTime < ms24Hours;

  // Link to the original Yahoo auction.
  var yahooAuctionLink = (0, _uris.originalAuctionURI)(id);

  // Find the 'seller' section, which is not clearly marked by a class name.
  var dl = $('dl').get().filter(function (dl) {
    return $($('dt', dl)[0]).text().trim() === 'Seller';
  });
  var $seller = $($('a', dl[0])[0]);
  var sellerName = $seller.text().trim();
  var sellerLink = (0, _uris.ensureFullURI)($seller.attr('href'));
  var $goodRatings = $('table.rating a[href*="filter=1"]');
  var $badRatings = $('table.rating a[href*="filter=-1"]');
  var goodRatingsAmount = Number($goodRatings.text().trim());
  var badRatingsAmount = Number($badRatings.text().trim());
  var ratingBalance = goodRatingsAmount - badRatingsAmount;
  var goodRatingsLink = $goodRatings.attr('href');
  var badRatingsLink = $badRatings.attr('href');

  // Try to parse the item description.

  var _getCleanDescription = (0, _helpers.getCleanDescription)($('#auction_item_description')),
      itemDescriptionHTML = _getCleanDescription.itemDescriptionHTML,
      itemDescription = _getCleanDescription.itemDescription;

  // Retrieve the image link.


  var images = $('#itemPhoto_sec .slides a').get().map(function (a) {
    return $(a).attr('href');
  });

  return {
    // Primary item information.
    id: id,
    title: title,
    categories: cats,
    link: url,
    originalAuctionLink: yahooAuctionLink,
    quantity: itemDetailTable.itemQuantity,
    condition: itemDetailTable.itemCondition,
    descriptionHTML: itemDescriptionHTML,
    description: itemDescription,
    images: images,

    // Details about the bidding process.
    details: {
      canFinishEarly: itemDetailTable.earlyFinish,
      automaticExtension: itemDetailTable.automaticExtension,
      ratingRestricted: itemDetailTable.sellerRatingRestriction,
      shippingPaidBy: itemDetailTable.shippingPaidBy,
      // An item is an auction if there is a current price listed.
      // That means it's possible to bid.
      isAuction: !!currentPrice,
      // True if an item has no regular bidding process and only a buyout price.
      isBuyoutOnly: !currentPrice && !!buyoutPrice
    },
    // Current bidding status.
    price: {
      openingBid: itemDetailTable.openingPrice,
      numberOfBids: itemDetailTable.numberOfBids,
      highestBidder: itemDetailTable.highestBidder,
      buyoutPrice: buyoutPrice,
      currentPrice: currentPrice
    },
    // Time to bidding end.
    time: {
      isNewlyListed: isNewlyListed,
      timeRemaining: timeRemaining,
      openingTime: itemDetailTable.openingTime.toISOString(),
      closingTime: itemDetailTable.closingTime.toISOString(),
      currentTime: itemDetailTable.currentTime.toISOString()
    },
    // Information about the seller.
    seller: {
      name: sellerName,
      link: sellerLink,
      rating: ratingBalance,
      positiveRatings: {
        amount: goodRatingsAmount,
        link: goodRatingsLink
      },
      negativeRatings: {
        amount: badRatingsAmount,
        link: badRatingsLink
      }
    }
  };
};
