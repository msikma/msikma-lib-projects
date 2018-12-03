// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { removeQuery } from 'mlib-common/lib/query'
import { cheerio } from 'mlib-common/lib/scrape'
import requestURI from 'mlib-common/lib/request'

import { fullURI, extractURIInfo, makeShortLink } from './uris'
import { parseStatus, parseDelivery, parsePrice, parseMPDate } from './util'

// Runs detail page scraping code on the passed HTML string.
// If something goes wrong while scraping, the data object contains error details instead.
export const scrapeDetail = (html, id, slug, url, urlShort) => {
  const $ = cheerio.load(html, { decodeEntities: false })
  try {
    return getDetailPage($, id, slug, url, urlShort)
  }
  catch (error) {
    return { errorType: 'PARSE_ERROR', error }
  }
}

// Extracts all data from a detail page.
const getDetailPage = ($, id, slug, url, urlShort) => {
  const listing = $('#content')

  // Basic listing information.
  const title = $('#title', listing).text().trim()
  const desc = $('#vip-ad-description', listing).html().trim()
  const viewCount = parseInt($('#view-count', listing).text().trim(), 10)
  const favCount = parseInt($('#favorited-count', listing).text().trim(), 10)
  const date = parseMPDate($('#displayed-since .sentence + span', listing).text().trim())
  const urlAd = $('#vip-seller-url-link', listing).attr('data-url').trim()
  // todo: should this be an array?
  const status = $('.attribute-tables tr', listing).get().map(tr => parseStatus($('.value', tr).text().trim()))

  // About the seller.
  const $seller = $('.contact-info .top-info a', listing)
  const $sellInfo = $('.contact-info .seller-info', listing)
  const verifiedPhone = $(".trust-indicator-group span[class*='-two-factor-verification']", listing)
  const verifiedBankNr = $(".trust-indicator-group span[class*='-bank-account']", listing)
  const verifiedID = $(".trust-indicator-group span[class*='-id']", listing)
  //const score = parseInt($('.mp-StarRating > span', $sellInfo).text().slice(1, 2), 10)
  const seller = {
    name: $seller.text().trim(),
    url: $seller.attr('href').trim(),
    isVIP: $('span[data-id="vip-trust-indicator-badge"]', $seller).attr('aria-hidden').trim() !== 'true',
    verifiedPhone,
    verifiedBankNr,
    verifiedID,
    //score,
    //scoreStr: `${score}/5`
  }

  // Price and delivery details.
  const priceRaw = $('#vip-ad-price-container', listing).text().trim()
  const priceVals = parsePrice(priceRaw)
  const shippingRaw = $('.shipping-details-value.price', listing).text().trim()
  const shippingVals = parsePrice(shippingRaw)
  const location = $("#vip-map-show", listing).text().trim()
  const delivery = parseDelivery($('.shipping-details-value:not(.price)', listing).text().trim())

  // Images.
  const thumb = 'todo'
  const hasThumb = 'todo'
  const images = ['https://todo/image1.jpg', 'https://todo/image2.jpg']

  return {
    id,
    slug,
    title,
    desc,
    url,
    urlShort,
    location,
    product: {
      ...priceVals
    },
    shipping: {
      ...shippingVals
    },
    urlAd,
    viewCount,
    favCount,
    seller,
    delivery,
    status,
    thumb,
    hasThumb,
    images,
    date
  }
}

/** Runs a detail scrape query using a URL. */
const getDetailURL = async (origURL, params) => {
  const html = await requestURI(fullURI(origURL), true)
  const url = removeQuery(html.request.href)
  const { id, slug } = extractURIInfo(url)
  const shortURL = makeShortLink(id)
  const data = scrapeDetail(await requestURI(url), id, slug, url, shortURL)
  return { reqParams: params, shortURL, reqURL: url, data }
}

/** Runs a detail scrape query using an ID. */
const getDetailID = async (id, params) => {
  const shortURL = makeShortLink(id)
  const html = await requestURI(shortURL, true)
  const url = removeQuery(html.request.href)
  const { slug } = extractURIInfo(url)
  const data = scrapeDetail(html.body, id, slug, url, shortURL)
  return { reqParams: params, shortURL, reqURL: url, data }
}

// Runs a query for a detail page, extracts the information, and then returns it.
const getDetail = async params => {
  if (params.url) return getDetailURL(params.url, params)
  if (params.id) return getDetailID(params.id, params)
}

export default getDetail
