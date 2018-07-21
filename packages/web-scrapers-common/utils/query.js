'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFormURIComponent = exports.objToParams = undefined;

var _lodash = require('lodash');

/**
 * Converts an object of key/value pairs to URI parameters without leading question mark.
 * By default, we remove: null, empty strings and empty arrays.
 */
var objToParams = exports.objToParams = function objToParams(obj) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$removeNull = _ref.removeNull,
      removeNull = _ref$removeNull === undefined ? true : _ref$removeNull,
      _ref$removeEmptyStrin = _ref.removeEmptyString,
      removeEmptyString = _ref$removeEmptyStrin === undefined ? true : _ref$removeEmptyStrin,
      _ref$removeEmptyArray = _ref.removeEmptyArray,
      removeEmptyArray = _ref$removeEmptyArray === undefined ? true : _ref$removeEmptyArray,
      _ref$removeFalse = _ref.removeFalse,
      removeFalse = _ref$removeFalse === undefined ? false : _ref$removeFalse;

  return Object.keys(obj)
  // Filter out everything that needs to be filtered out.
  .filter(function (k) {
    return (!removeNull || removeNull && obj[k] != null) && (!removeEmptyString || removeEmptyString && obj[k] !== '') && (!removeFalse || removeFalse && obj[k] !== false) && (!removeEmptyArray || removeEmptyArray && (!(0, _lodash.isArray)(obj[k]) || obj[k].length > 0));
  })
  // Encode to URI components. Account for the zero-width array.
  .map(function (k) {
    return (0, _lodash.isArray)(obj[k]) && obj[k].length > 0 ? obj[k].map(function (i) {
      return encodeURIComponent(k) + '[]=' + encodeURIComponent(i);
    }).join('&') : '' + encodeURIComponent(k) + ((0, _lodash.isArray)(obj[k]) ? '[]' : '') + '=' + encodeURIComponent(obj[k]);
  }).join('&');
};

/**
 * Converts the spaces in a URI parameter string to the '+' character.
 * Only for use in application/x-www-form-urlencoded.
 * Run this on URI encoded strings - e.g. toFormURIComponent(encodeURIComponent(query)).
 */
/**
 * web-scrapers-util - Utilities for web scraper projects <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

var toFormURIComponent = exports.toFormURIComponent = function toFormURIComponent(paramStr) {
  return paramStr.replace(/%20/g, '+');
};