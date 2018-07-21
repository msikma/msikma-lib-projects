'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _product = require('./product');

Object.defineProperty(exports, 'fetchProductData', {
  enumerable: true,
  get: function get() {
    return _product.fetchProductData;
  }
});

var _search = require('./search');

Object.defineProperty(exports, 'fetchSearchData', {
  enumerable: true,
  get: function get() {
    return _search.fetchSearchData;
  }
});