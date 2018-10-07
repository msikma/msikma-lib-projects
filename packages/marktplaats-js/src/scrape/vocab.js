import { splitOnLast } from 'mlib-common/lib/text'

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

const vocabLookup = (vocab, fallback = null) => (str) => vocab[str] || (fallback != null ? fallback : str)

// Returns the simplified text form of a status string.
export const parseStatus = vocabLookup(statusVocab)

// Returns the simplified text form of a status string.
export const parseDelivery = vocabLookup(deliveryVocab)

const priceLookup = vocabLookup(priceVocab, '')

export const parsePrice = (str) => {
  const priceType = priceLookup(str)
  const price = parsePriceValue(str)
  return {
    priceType,
    price
  }
}

const parsePriceValue = (str) => {
  if (str.indexOf('€') === -1) return null
  const number = splitOnLast(str.replace('€', '').trim(), ',')
  const eur = parseInt(number[0].replace(',', ''), 10)
  const cents = parseInt(number[1].slice(1), 10)
  return { value: eur + (cents * 0.01), currency: 'EUR' }
}
