'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * common - Utilities for web scraper projects <https://github.com/msikma/msikma-lib-projects>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

/**
 * Removes extra empty lines by trimming every line, then removing the empty strings.
 * If 'leaveGap' is true, we will instead compress multiple empty lines down to a single empty line.
 */
var removeEmptyLines = exports.removeEmptyLines = function removeEmptyLines(str) {
  var leaveGap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (leaveGap) {
    var split = str.split('\n').map(function (l) {
      return l.trim();
    });
    var lines = split.reduce(function (acc, curr) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(curr === acc[acc.length - 1] ? [] : [curr]));
    }, []);
    return lines.join('\n');
  } else {
    return str.split('\n').map(function (l) {
      return l.trim();
    }).filter(function (l) {
      return l !== '';
    }).join('\n');
  }
};

/** List of block elements. (Non-exhaustive, but it works well enough for most cases.) */
var blockEls = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'pre', 'address', 'blockquote', 'dl', 'div', 'fieldset', 'form', 'noscript', 'table'];

/** Converts block elements to linebreaks. Useful for cleaning up HTML before converting to plain text. */
var blockElsToLb = exports.blockElsToLb = function blockElsToLb($text) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = blockEls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      $text.find(el).before('\n');
    }
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

  $text.find('br').replaceWith('\n');
  $text.find('hr').replaceWith('\n');
};
