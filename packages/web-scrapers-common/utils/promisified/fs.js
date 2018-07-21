'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
                                                                                                                                                                                                                                                                   * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                   */

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _extends({}, _bluebird2.default.promisifyAll(require('fs')));
