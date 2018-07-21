'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _search = require('./search');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YahooAuction = function () {
  function YahooAuction() {
    _classCallCheck(this, YahooAuction);

    // Last search the user ran.
    this.lastSearchURL = null;
    this.lastSearch = null;
    // Results from the last search.
    this.results = null;
  }
  /** Runs a search on Yahoo Japan Auction and returns the results as Product objects. */


  _createClass(YahooAuction, [{
    key: 'search',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchObj) {
        var _ref2, results, searchURL;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _search.runSearch)(searchObj);

              case 2:
                _ref2 = _context.sent;
                results = _ref2.results;
                searchURL = _ref2.searchURL;


                this.lastSearchURL = searchURL;
                this.lastSearch = searchObj;
                this.results = results;

                return _context.abrupt('return', results);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function search(_x) {
        return _ref.apply(this, arguments);
      }

      return search;
    }()
  }]);

  return YahooAuction;
}();

exports.default = YahooAuction;
