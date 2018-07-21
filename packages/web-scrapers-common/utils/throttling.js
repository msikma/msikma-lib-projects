"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * web-scrapers-util - Utilities for web scraper projects <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

/**
 * Promisified version of setInterval() for use with await.
 * Use like: await wait(1000) to halt execution 1 second.
 */
var wait = exports.wait = function wait(ms) {
  return new Promise(function (resolve) {
    return setInterval(function () {
      return resolve();
    }, ms);
  });
};