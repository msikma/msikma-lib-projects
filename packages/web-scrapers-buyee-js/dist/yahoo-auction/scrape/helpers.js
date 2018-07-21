'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCleanDescription = exports.parseDateJST = exports.filterShippingPayment = exports.filterBoolean = exports.filterItemCondition = exports.filterPrice = exports.scrapePrice = exports.getIDFromURL = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * buyee-js - Buyee Client Library <https://github.com/msikma/buyee-js>
                                                                                                                                                                                                                                                                   * Copyright © 2018, Michiel Sikma. MIT license.
                                                                                                                                                                                                                                                                   */

var _text = require('web-scrapers-common/utils/text');

/**
 * Returns an item ID from either a link to a detail page, or to a category.
 *
 * E.g. 'https://buyee.jp/item/yahoo/auction/o249426312' has ID 'o249426312'.
 * Or 'https://buyee.jp/item/search/category/20060' has ID '20060'.
 */
var getIDFromURL = exports.getIDFromURL = function getIDFromURL(url) {
  if (!url) return null;

  // Match detail page.
  var matchDetail = url.trim().match(/yahoo\/auction\/(.+?)$/);
  if (matchDetail) return matchDetail[1];

  // Match category.
  var matchCat = url.trim().match(/search\/category\/(.+?)$/);
  if (matchCat) return matchCat[1];

  // Couldn't find anything.
  return null;
};

/** Scrapes a product price from a search result page item. */
var scrapePrice = exports.scrapePrice = function scrapePrice($, item) {
  // Remove the alternate currency price. The regular price cannot otherwise be targeted by itself.
  $('.product_price span', item).remove();
  var priceRaw = $('.product_price', item).text().trim();

  return filterPrice(priceRaw);
};

/** Filters the actual price value out of the text retrieved from the DOM node. */
var filterPrice = exports.filterPrice = function filterPrice(priceRaw) {
  if (!priceRaw) return null;
  // The price contains a string such as '1,400 yen'. Filter out anything but numbers and remove commas.
  var priceMatch = priceRaw.match(/([0-9,]+)/);
  var price = priceMatch ? Number(priceMatch[1].replace(',', '')) : null;

  // The price locale is a constant object. Yahoo Japan Auction always displays yen.
  var priceLocale = { style: 'currency', currency: 'JPY' };

  return { price: price, locale: priceLocale };
};

/** List of item conditions used by Buyee. */
var itemConditions = {
  'used item': 'used',
  'other': 'unused',
  'new item': 'new'

  /**
   * Returns a cleaned up version of the item condition.
   */
};var filterItemCondition = exports.filterItemCondition = function filterItemCondition(condition) {
  // Look up the base condition in our table.
  var split = condition.split('/');
  var baseCondition = itemConditions[split[0].trim().toLowerCase()];
  // If there is a description, include it verbatim. This is a free input field.
  return _extends({ state: baseCondition }, split[1] ? { description: split[1].trim() } : {});
};

/**
 * Returns true/false for a Yes/No string boolean.
 */
var filterBoolean = exports.filterBoolean = function filterBoolean(bool) {
  return bool === 'Yes' ? true : false;
};

/**
 * Returns who pays for shipping.
 * This is either 'winner' or 'seller'. But all we need to do is lowercase it.
 */
var filterShippingPayment = exports.filterShippingPayment = function filterShippingPayment(person) {
  return person.toLowerCase();
};

/** Returns a Javascript date object, assuming that the source string is in JST. */
var parseDateJST = exports.parseDateJST = function parseDateJST(dateStr) {
  // Expect e.g. '18 Jul 2018 23:41:10'.
  return new Date(dateStr + ' +0900');
};

/**
 * Returns cleaned up HTML and text from a Cheerio description node.
 */
var getCleanDescription = exports.getCleanDescription = function getCleanDescription($description) {
  // Add a linebreak before every <div> to ensure we have some linebreaks.
  (0, _text.blockElsToLb)($description);
  var itemDescriptionHTML = $description.html().trim();
  var itemDescription = (0, _text.removeEmptyLines)($description.text().trim(), true);
  return { itemDescriptionHTML: itemDescriptionHTML, itemDescription: itemDescription };
};