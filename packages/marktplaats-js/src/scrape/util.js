// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { splitOnLast } from 'mlib-common/lib/text'

// List of abbreviated Dutch month names, translated to a zero-padded number.
const dutchMonths = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const dutchMonthTable = dutchMonths.reduce((acc, month, idx) => ({ ...acc, [month]: (idx < 10 ? `0${idx}` : idx) }), {})

// Vocabulary items: used to turn plain Dutch into a simpler form.
export const statusVocab = {
  'Zo goed als nieuw': 'ZGAN',
  'Gebruikt': 'GEBRUIKT',
  'Nieuw': 'NIEUW'
}
export const deliveryVocab = {
  'Verzenden': 'VERZENDEN',
  'Ophalen of Verzenden': 'OPHALEN/VERZENDEN'
}
export const priceVocab = {
  'Bieden': 'BIEDEN'
}

// Returns a function that looks up a vocabulary word.
const vocabLookup = (vocab, fallback = null) => (str) => vocab[str] || (fallback != null ? fallback : str)

// Parses a Dutch short date as given by Marktplaats.
// E.g.: "28 jul. '18, 00:21"
export const parseMPDate = (date) => {
  const bits = date
    // Remove the period and comma, so the input is space separated.
    .replace(/\.|,/g, '')
    // Turn e.g. "'18" into '2018'
    .replace("'", '20')
    // Now we have ['28', 'jul', '2018', '00:21']
    .split(' ')
  // '2018-07-29T00:21:00+0100'
  const cleanDate = new Date(`${bits[2]}-${dutchMonthTable[bits[1]]}-${bits[0]}T${bits[3]}:00+0100`)
  return cleanDate
}

/** Checks whether a thumbnail is the 'no photo' image. */
export const hasOriginalThumb = thumb => (
  thumb ? !/no_photo\.jpg$/.test(thumb) : false
)

// We get up to two attributes from a listing. One for shipping and one for status.
// Check which one they are, since we can't tell from the HTML.
// Attrs is an array like e.g. ['OPHALEN/VERZENDEN', 'GEBRUIKT'].
export const separateAttributes = (attrs) => {
  const statusKeys = Object.keys(statusVocab)
  const statusVals = Object.values(statusVocab)
  const deliveryKeys = Object.keys(deliveryVocab)
  const deliveryVals = Object.values(deliveryVocab)
  const items = attrs.reduce((acc, attr) => {
    const statusIdx = statusKeys.indexOf(attr)
    const deliveryIdx = deliveryKeys.indexOf(attr)
    if (statusIdx > -1) return { ...acc, ['_status']: statusVals[statusIdx] }
    if (deliveryIdx > -1) return { ...acc, ['_delivery']: deliveryVals[deliveryIdx] }
    return { ...acc }
  }, {})
  return items
}

// These return the simplified text form of vocabulary strings.
export const parseStatus = vocabLookup(statusVocab)
export const parseDelivery = vocabLookup(deliveryVocab)
const priceLookup = vocabLookup(priceVocab, '')

// Turns a Dutch price format string ('€ 5,50') into { value: 5.50, currency: 'EUR' }.
const parsePriceValue = (str) => {
  if (str.indexOf('€') === -1) return null
  const number = splitOnLast(str.replace('€', '').trim(), ',')
  const eur = parseInt(number[0].replace(',', ''), 10)
  const cents = parseInt(number[1].slice(1), 10)
  return { value: eur + (cents * 0.01), currency: 'EUR' }
}

// Returns a parsed price from a source string found on a Marktplaats page.
export const parsePrice = (str) => {
  const priceType = priceLookup(str) || null
  const price = parsePriceValue(str)
  return {
    priceType,
    price
  }
}

// Adds 'https:' before a URL if it starts with '//'.
export const addHttps = url => url && url.startsWith('//') ? `https:${url}` : url

// Extracts a category slug from a URL. Works for category subpage URLs
// and for category links on a subpage.
// E.g. 'https://www.marktplaats.nl/c/antiek-en-kunst/c1.html' yields 'antiek-en-kunst'.
// Or 'https://www.marktplaats.nl/z/antiek-en-kunst/antiek-servies-compleet.html?categoryId=1843' yields 'antiek-servies-compleet'.
export const getCatSlug = (url) => {
  const match1 = url.match(/c\/(.+?)\//)
  const match2 = url.match(/\/(.+?).html\?categoryId/)

  if (match1 && match1[1]) return match1[1]
  if (match2 && match2[1]) return match2[1]
}

// Extracts a category ID from a URL.
// E.g. 'https://www.marktplaats.nl/c/antiek-en-kunst/c1.html' yields 1.
// Or 'https://www.marktplaats.nl/z/antiek-en-kunst/antiek-boeken-en-bijbels.html?categoryId=3' yields 3.
export const getCatID = (url) => {
  const match1 = url.match(/c([0-9]+)\.html/)
  const match2 = url.match(/categoryId=([0-9]+)$/)

  if (match1 && match1[1]) return parseInt(match1[1], 10)
  if (match2 && match2[1]) return parseInt(match2[1], 10)
}
