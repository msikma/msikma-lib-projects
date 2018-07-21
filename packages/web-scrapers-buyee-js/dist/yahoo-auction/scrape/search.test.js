'use strict';

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('../../util/promisified/fs');

var _search = require('./search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * buyee-js - Buyee Client Library <https://github.com/msikma/buyee-js>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

/** Test directory in the project root. */
var testDir = _path2.default.normalize(__dirname + '/../../../test');

describe('scrapeSearchPage', function () {
  it('should retrieve all expected information from a search page', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var searchPageHTML, searchPageData, $;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fs.readFileAsync)(testDir + '/search_\u30DB\u309A\u30B1\u30C3\u30C8\u30E2\u30F3\u30B9\u30BF\u30FC_2084005356.html');

          case 2:
            searchPageHTML = _context.sent;
            searchPageData = require(testDir + '/search_\u30DB\u309A\u30B1\u30C3\u30C8\u30E2\u30F3\u30B9\u30BF\u30FC_2084005356_output.json');
            $ = _cheerio2.default.load(searchPageHTML);


            expect((0, _search.scrapeSearchPage)($)).toEqual(searchPageData);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});