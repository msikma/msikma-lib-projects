'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCookieFile = exports.browserHeaders = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * common - Utilities for web scraper projects <https://github.com/msikma/msikma-lib-projects>
                                                                                                                                                                                                                                                                   * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                   */

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _fileCookieStore = require('file-cookie-store');

var _fileCookieStore2 = _interopRequireDefault(_fileCookieStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Headers similar to what a regular browser would send.
var browserHeaders = exports.browserHeaders = {
  'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8,nl;q=0.7,de;q=0.6,es;q=0.5,it;q=0.4,pt;q=0.3',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Cache-Control': 'max-age=0',
  'Connection': 'keep-alive'

  /**
   * Loads cookies from a specified cookies.txt file and loads them into
   * a jar so that we can make requests with them.
   */
};var loadCookieFile = exports.loadCookieFile = function loadCookieFile(cookieFile) {
  return new Promise(function (resolve, reject) {
    try {
      // Cookies exported from the browser in Netscape cookie file format.
      // These are sent with our request to ensure we have access to logged in pages.
      var cookieStore = new _fileCookieStore2.default(cookieFile, { no_file_error: true });
      var jar = _requestPromise2.default.jar(cookieStore);
      resolve({ jar: jar });
    } catch (err) {
      reject(err);
    }
  });
};

// Default settings for requests.
var requestDefaults = {
  gzip: true
};

var requestURI = function requestURI(url) {
  for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    props[_key - 2] = arguments[_key];
  }

  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _requestPromise2.default)(_extends({ url: url, headers: _extends({}, browserHeaders, headers) }, requestDefaults, props));
};

exports.default = requestURI;
