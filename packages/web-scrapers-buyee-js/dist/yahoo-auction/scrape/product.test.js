'use strict';

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('../../util/promisified/fs');

var _product = require('./product');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * buyee-js - Buyee Client Library <https://github.com/msikma/buyee-js>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

/** Test directory in the project root. */
var testDir = _path2.default.normalize(__dirname + '/../../../test');

describe('scrapeProductPage', function () {
  it('should retrieve all expected information from a product detail page', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var productPageHTML, productPageData, productPageURL, a;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([(0, _fs.readFileAsync)(testDir + '/auction_l389909557.html', 'utf8'), (0, _fs.readFileAsync)(testDir + '/auction_r219564858.html', 'utf8'), (0, _fs.readFileAsync)(testDir + '/auction_r256784712.html', 'utf8')]);

          case 2:
            productPageHTML = _context.sent;
            productPageData = [require(testDir + '/auction_l389909557_output.json'), require(testDir + '/auction_r219564858_output.json'), require(testDir + '/auction_r256784712_output.json')];
            productPageURL = ['https://buyee.jp/item/yahoo/auction/l389909557', 'https://buyee.jp/item/yahoo/auction/r219564858', 'https://buyee.jp/item/yahoo/auction/r256784712'];

            // Check every item with its expected output.

            for (a = 0; a < productPageHTML.length; ++a) {
              expect((0, _product.scrapeProductPage)(_cheerio2.default.load(productPageHTML[a]), productPageURL[a])).toEqual(productPageData[a]);
            }

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});