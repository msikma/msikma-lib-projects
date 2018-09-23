'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapeSearchPage = exports.fetchSearchData = undefined;

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('web-scrapers-common/utils/request');

var _request2 = _interopRequireDefault(_request);

var _uris = require('../uris');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

/** Retrieves HTML from a search url and scrapes out any product items found there. */
var fetchSearchData = exports.fetchSearchData = function () {
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
            return _context.abrupt('return', scrapeSearchPage($html, url));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchSearchData(_x) {
    return _ref.apply(this, arguments);
  };
}();

/** Scrapes a search result page and returns product items found there. */
var scrapeSearchPage = exports.scrapeSearchPage = function scrapeSearchPage($, url) {
  var products = $('.product_field.list_layout .product_whole').get();

  var items = products.map(scrapeSingleResult($));

  return {
    items: items
  };
};

/**
 * Scrapes a single search result. Only limited data is found here.
 *
 * Note: currency representation uses the ISO 4217 currency code list, e.g. JPY for Japanese Yen.
 *
 * Example HTML:
 *
 *   <li class="product_whole">
 *     <a href="/item/yahoo/auction/f280343248" data-bind="click: $root.ec.onProductClick.bind($root.ec, 0)">
 *       <div class="image_container">
 *         <div class="product_image_wrap">
 *           <img class="product_image" alt="バンプレスト ONE PIECE　ワンピース DX海軍 プラ" data-src="https://wing-auctions.c.yimg.jp/sim?furl=auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0407/users/0/2/3/7/gotetsuheizou-img900x1200-1531541130l1oyfd8060.jpg&amp;dc=1&amp;sr.fs=20000"
 *             src="https://wing-auctions.c.yimg.jp/sim?furl=auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0407/users/0/2/3/7/gotetsuheizou-img900x1200-1531541130l1oyfd8060.jpg&amp;dc=1&amp;sr.fs=20000">
 *         </div>
 *         <div class="product_em_status_brandnew"><p class="its_new buyeeicon-brandnew"></p></div>
 *         <div class="product_em_status_bids">
 *           <p class="bidders"><i class="buyeeicon-bids">1</i></p>
 *         </div>
 *       </div>
 *       <div class="product_info">
 *         <p class="product_title">バンプレスト ONE PIECE　ワンピース DX海軍 プライズ</p>
 *         <p class="product_remaining"><i class="generalicon-clock">2 day(s)</i></p>
 *         <p class="product_price">1,000 yen<br><span class="small">(€8,00)</span></p>
 *         <p class="product_bidorbuy">ー<br><span class="small">(ー)</span></p>
 *         <ul class="product_status_list"></ul>
 *       </div>
 *     </a>
 *     <a data-bind="click: search.bind($data, { seller: 'gotetsuheizou' })" class="product_seller">
 *       <i class="buyeeicon-shop">gotetsuheizou</i>
 *     </a>
 *   </li>
 */
var scrapeSingleResult = function scrapeSingleResult($) {
  return function (item) {
    var priceObject = (0, _helpers.scrapePrice)($, item);
    var link = (0, _uris.ensureFullURI)($('> a', item).attr('href').trim());
    return {
      id: (0, _helpers.getIDFromURL)(link),
      title: $('.product_title', item).text().trim(),
      link: link,
      thumbnail: $('.product_image[data-src]', item).attr('data-src').trim(),

      // Details is empty for now, until we get extended information.
      details: {},
      price: {
        currentPrice: priceObject,
        numberOfBids: Number($('.product_em_status_bids', item).text().trim())
      },
      time: {
        isNewlyListed: $('.its_new', item).length > 0,
        timeRemaining: $('.product_remaining', item).text().trim()
      },
      seller: {
        name: $('.product_seller', item).text().trim()
      }
    };
  };
};
