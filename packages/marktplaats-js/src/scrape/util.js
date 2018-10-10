// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

// List of abbreviated Dutch month names, translated to a zero-padded number.
const dutchMonths = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const dutchMonthTable = dutchMonths.reduce((acc, month, idx) => ({ ...acc, [month]: (idx < 10 ? `0${idx}` : idx) }), {})

// Vocabulary items: used to turn plain Dutch into a simpler form.
export const statusVocab = {
  'Zo goed als nieuw': 'ZGAN',
  'Gebruikt': 'GEBRUIKT'
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
  const priceType = priceLookup(str)
  const price = parsePriceValue(str)
  return {
    priceType,
    price
  }
}


