/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/buyee-js>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

import cheerio from 'cheerio'
import requestURI from 'web-scrapers-common/utils/request'

import { ensureFullURI, originalAuctionURI } from '../uris'
import { getIDFromURL, filterPrice, filterItemCondition, filterBoolean, parseDateJST, filterShippingPayment, getCleanDescription } from './helpers'

/** 24 hours in ms. */
const ms24Hours = 86400000

/**
 * A key/value table for turning Buyee's plain strings into JS camelCase names.
 * Also includes functions that will be used to transform some values.
 */
const detailTableTransform = {
  'Quantity': ['itemQuantity', Number],
  'Item Condition': ['itemCondition', filterItemCondition],

  'Opening Price': ['openingPrice', filterPrice],
  'Number of Bids': ['numberOfBids', Number],
  'Highest Bidder': ['highestBidder', bidder => bidder ? bidder : null],

  'Opening Time　(JST)': ['openingTime', parseDateJST],
  'Closing Time　(JST)': ['closingTime', parseDateJST],
  'Current Time　(JST)': ['currentTime', parseDateJST],

  // If true, the seller can end the auction early at their discretion.
  'Early Finish': ['earlyFinish', filterBoolean],
  // Extends the auction by 5 minutes each time the highest bid comes within the last 5 minutes.
  'Automatic Extension': ['automaticExtension', filterBoolean],
  // If true, the seller has set restrictions (based on feedback score/rating) for who can/cannot bid.
  'Seller Rating Restriction': ['sellerRatingRestriction', filterBoolean],
  'Shipping Paid By': ['shippingPaidBy', filterShippingPayment]
}

/** Retrieves HTML from a product's detail page and returns its extended info. */
export const fetchProductData = async url => {
  const html = await requestURI(url)
  const $html = cheerio.load(html)

  return scrapeProductPage($html, url)
}

/**
 * Scrapes a product page and returns information found there.
 */
export const scrapeProductPage = ($, url) => {
  const id = getIDFromURL(url)
  const title = $('#itemHeader h1').text().trim()

  // Return an array of all categories for this item.
  const cats = $('.cat_navi a').get().map(cat => {
    const $cat = $(cat)
    const url = ensureFullURI($cat.attr('href'))
    const id = getIDFromURL(url)
    const name = $cat.text().trim()
    return {
      name,
      id,
      url
    }
  })

  // Retrieve all info from the item data table.
  const itemDetailTable = $('#itemDetail_data li').get().reduce((data, item) => {
    // Add the cleaned up key name to the data list.
    const keyString = $('em', item).text().trim()
    if (!detailTableTransform[keyString]) return data
    const key = detailTableTransform[keyString][0]
    // If applicable, run the value through a cleanup function.
    const valueString = $('span', item).text().trim()
    const valueFn = detailTableTransform[keyString][1]

    return { ...data, [key]: valueFn ? valueFn(valueString) : valueString }
  }, {})

  // Retrieve the current price and buyout price.
  const currentPrice = filterPrice($('.current_price .current_price_output em').text().trim())
  const buyoutPrice = filterPrice($('.current_price .snaipe_price em').text().trim())

  // Calculate number of seconds to closing time.
  const openingTime = itemDetailTable.openingTime.getTime()
  const currentTime = itemDetailTable.currentTime.getTime()
  const closingTime = itemDetailTable.closingTime.getTime()
  const timeRemaining = (closingTime - currentTime) / 1000

  // A listing is considered 'newly listed' if less than 24 hours has passed since its opening.
  const isNewlyListed = (currentTime - openingTime) < ms24Hours

  // Link to the original Yahoo auction.
  const yahooAuctionLink = originalAuctionURI(id)

  // Find the 'seller' section, which is not clearly marked by a class name.
  const dl = $('dl').get().filter(dl => $($('dt', dl)[0]).text().trim() === 'Seller')
  const $seller = $($('a', dl[0])[0])
  const sellerName = $seller.text().trim()
  const sellerLink = ensureFullURI($seller.attr('href'))
  const $goodRatings = $('table.rating a[href*="filter=1"]')
  const $badRatings = $('table.rating a[href*="filter=-1"]')
  const goodRatingsAmount = Number($goodRatings.text().trim())
  const badRatingsAmount = Number($badRatings.text().trim())
  const ratingBalance = goodRatingsAmount - badRatingsAmount
  const goodRatingsLink = $goodRatings.attr('href')
  const badRatingsLink = $badRatings.attr('href')

  // Try to parse the item description.
  const { itemDescriptionHTML, itemDescription } = getCleanDescription($('#auction_item_description'))

  // Retrieve the image link.
  const images = $('#itemPhoto_sec .slides a').get().map(a => $(a).attr('href'))

  return {
    // Primary item information.
    id,
    title,
    categories: cats,
    link: url,
    originalAuctionLink: yahooAuctionLink,
    quantity: itemDetailTable.itemQuantity,
    condition: itemDetailTable.itemCondition,
    descriptionHTML: itemDescriptionHTML,
    description: itemDescription,
    images,

    // Details about the bidding process.
    details: {
      canFinishEarly: itemDetailTable.earlyFinish,
      automaticExtension: itemDetailTable.automaticExtension,
      ratingRestricted: itemDetailTable.sellerRatingRestriction,
      shippingPaidBy:  itemDetailTable.shippingPaidBy,
      // An item is an auction if there is a current price listed.
      // That means it's possible to bid.
      isAuction: !!currentPrice,
      // True if an item has no regular bidding process and only a buyout price.
      isBuyoutOnly: !currentPrice && !!buyoutPrice
    },
    // Current bidding status.
    price: {
      openingBid: itemDetailTable.openingPrice,
      numberOfBids: itemDetailTable.numberOfBids,
      highestBidder: itemDetailTable.highestBidder,
      buyoutPrice,
      currentPrice
    },
    // Time to bidding end.
    time: {
      isNewlyListed,
      timeRemaining,
      openingTime: itemDetailTable.openingTime.toISOString(),
      closingTime: itemDetailTable.closingTime.toISOString(),
      currentTime: itemDetailTable.currentTime.toISOString()
    },
    // Information about the seller.
    seller: {
      name: sellerName,
      link: sellerLink,
      rating: ratingBalance,
      positiveRatings: {
        amount: goodRatingsAmount,
        link: goodRatingsLink
      },
      negativeRatings: {
        amount: badRatingsAmount,
        link: badRatingsLink
      }
    }
  }
}
