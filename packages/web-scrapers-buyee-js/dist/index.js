'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cli = undefined;

var _cli = require('./util/cli');

var _yahooAuction = require('./yahoo-auction');

var _yahooAuction2 = _interopRequireDefault(_yahooAuction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

/**
 * Runs a single action from the command line, prints the result and then exits.
 */
var cli = exports.cli = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {
    var cliAuction, results;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(process.env.BUYEE_JS_CLI !== '1')) {
              _context.next = 2;
              break;
            }

            throw new Error('Cannot use cli() except from the buyee-cli command line utility');

          case 2:
            if (!(args.action === 'search')) {
              _context.next = 11;
              break;
            }

            cliAuction = new _yahooAuction2.default();
            _context.next = 6;
            return cliAuction.search((0, _cli.cliToAPIArgs)(args));

          case 6:
            results = _context.sent;

            (0, _cli.outputData)(results, args.output);
            process.exit(0);
            _context.next = 13;
            break;

          case 11:
            console.error('buyee-cli: error: argument "--action": Invalid action');
            process.exit(1);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function cli(_x) {
    return _ref.apply(this, arguments);
  };
}();