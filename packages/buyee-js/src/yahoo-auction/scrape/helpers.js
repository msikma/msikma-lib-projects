/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

import { removeEmptyLines, blockElsToLb } from 'web-scrapers-common/utils/text'

/**
 * Returns an item ID from either a link to a detail page, or to a category.
 *
 * E.g. 'https://buyee.jp/item/yahoo/auction/o249426312' has ID 'o249426312'.
 * Or 'https://buyee.jp/item/search/category/20060' has ID '20060'.
 */
export const getIDFromURL = url => {
  if (!url) return null

  // Match detail page.
  const matchDetail = url.trim().match(/yahoo\/auction\/(.+?)$/)
  if (matchDetail) return matchDetail[1]

  // Match category.
  const matchCat = url.trim().match(/search\/category\/(.+?)$/)
  if (matchCat) return matchCat[1]

  // Couldn't find anything.
  return null
}

/** Scrapes a product price from a search result page item. */
export const scrapePrice = ($, item) => {
  // Remove the alternate currency price. The regular price cannot otherwise be targeted by itself.
  $('.product_price span', item).remove()
  const priceRaw = $('.product_price', item).text().trim()

  return filterPrice(priceRaw)
}

/** Filters the actual price value out of the text retrieved from the DOM node. */
export const filterPrice = priceRaw => {
  if (!priceRaw) return null
  // The price contains a string such as '1,400 yen'. Filter out anything but numbers and remove commas.
  const priceMatch = priceRaw.match(/([0-9,]+)/)
  const price = priceMatch ? Number(priceMatch[1].replace(',', '')) : null

  // The price locale is a constant object. Yahoo Japan Auction always displays yen.
  const priceLocale = { style: 'currency', currency: 'JPY' }

  return { price, locale: priceLocale }
}

/** List of item conditions used by Buyee. */
const itemConditions = {
  'used item': 'used',
  'other': 'unused',
  'new item': 'new'
}

/**
 * Returns a cleaned up version of the item condition.
 */
export const filterItemCondition = condition => {
  // Look up the base condition in our table.
  const split = condition.split('/')
  const baseCondition = itemConditions[split[0].trim().toLowerCase()]
  // If there is a description, include it verbatim. This is a free input field.
  return { state: baseCondition, ...(split[1] ? { description: split[1].trim() } : {}) }
}

/**
 * Returns true/false for a Yes/No string boolean.
 */
export const filterBoolean = bool => {
  return bool === 'Yes' ? true : false
}

/**
 * Returns who pays for shipping.
 * This is either 'winner' or 'seller'. But all we need to do is lowercase it.
 */
export const filterShippingPayment = person => {
  return person.toLowerCase()
}

/** Returns a Javascript date object, assuming that the source string is in JST. */
export const parseDateJST = dateStr => {
  // Expect e.g. '18 Jul 2018 23:41:10'.
  return new Date(`${dateStr} +0900`)
}

/**
 * Returns cleaned up HTML and text from a Cheerio description node.
 */
export const getCleanDescription = ($description) => {
  // Add a linebreak before every <div> to ensure we have some linebreaks.
  blockElsToLb($description)
  const itemDescriptionHTML = $description.html().trim()
  const itemDescription = removeEmptyLines($description.text().trim(), true)
  return { itemDescriptionHTML, itemDescription }
}
