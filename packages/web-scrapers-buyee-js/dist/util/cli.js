'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outputData = exports.cliToAPIArgs = undefined;

var _lodash = require('lodash');

var _search = require('../yahoo-auction/search');

// List of source and destination paths for converting from CLI format to API format.
/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/buyee-js>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

var cliToParams = [['query', 'query'], ['category', 'category'], ['seller', 'seller'], ['price_min', 'currentPriceRange.min'], ['price_max', 'currentPriceRange.max'], ['buyout_min', 'buyoutPriceRange.min'], ['buyout_max', 'buyoutPriceRange.max'], ['item_status', 'itemStatus'], ['store_type', 'storeType']];
// Miscellaneous options.
var cliToParamOptions = ['withBuyout', 'newlyListed', 'freeDeliveryInJapan', 'withPictures', 'buyeeRecommended'];
// List of paths to convert to number.
var cliNumberParams = ['currentPriceRange.min', 'currentPriceRange.max', 'buyoutPriceRange.min', 'buyoutPriceRange.max'];

/**
 * Converts arguments from the command line argparse module to a proper search object.
 * The object contains roughly the following items:
 *
 *   { action: 'search',
 *     output: 'json',
 *     query: 'one piece',
 *     category: '20060',
 *     seller: 'resyk19',
 *     price_min: '800',
 *     price_max: '1500',
 *     buyout_min: '340',
 *     buyout_max: '500000',
 *     item_status: 'any',
 *     store_type: 'any',
 *     withBuyout: true,
 *     newlyListed: true,
 *     freeDeliveryInJapan: true,
 *     withPictures: false,
 *     buyeeRecommended: false }
 *
 * We will return this data in the following format:
 *
 *   { currentPriceRange: { min: 800, max: 1500 },
 *     buyoutPriceRange: { min: 340, max: 500000 },
 *     itemStatus: 'any',
 *     storeType: 'any',
 *     options:
 *      { withBuyout: true,
 *        newlyListed: true,
 *        freeDeliveryInJapan: true,
 *        withPictures: false,
 *        buyeeRecommended: false },
 *     query: 'one piece',
 *     category: '20060',
 *     seller: 'resyk19' }
 */
var cliToAPIArgs = exports.cliToAPIArgs = function cliToAPIArgs(cliParams) {
  var params = (0, _lodash.cloneDeep)(_search.defaults);

  // Bring over every parameter from the source/destination mapping.
  var from = void 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cliToParams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var fromTo = _step.value;

      from = (0, _lodash.get)(cliParams, fromTo[0]);
      if (from) {
        (0, _lodash.set)(params, fromTo[1], from);
      }
    }

    // Set the miscellaneous search options object.
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  (0, _lodash.set)(params, 'options', (0, _lodash.pick)(cliParams, cliToParamOptions));

  // Convert some parameters to numbers.
  var value = void 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = cliNumberParams[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var path = _step2.value;

      value = (0, _lodash.get)(params, path, null);
      (0, _lodash.set)(params, path, value ? Number(value) : value);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return params;
};

/**
 * Outputs the data from a search result (or really, any kind of data).
 */
var outputData = exports.outputData = function outputData(data) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'json';

  if (format === 'json') {
    return console.log(JSON.stringify(wrapOutputData(data)));
  }
};

// Ensures the result data is at least an empty object and is wrapped in 'result'.
var wrapOutputData = function wrapOutputData() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    result: result
  };
};