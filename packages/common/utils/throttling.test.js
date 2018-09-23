'use strict';

var _throttling = require('./throttling');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

describe('wait', function () {
  it('should return a Promise', function () {
    expect((0, _throttling.wait)(0)).toBeInstanceOf(Promise);
  });

  it('should resolve to null', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expect((0, _throttling.wait)(0)).resolves.toBe(null);

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});
