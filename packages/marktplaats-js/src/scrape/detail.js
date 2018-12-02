// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { cheerio } from 'mlib-common/lib/scrape'
import requestURI from 'mlib-common/lib/request'

import { detailURI, extractURIInfo } from './uris'
import { parseStatus, parseDelivery, parsePrice, parseMPDate } from './util'

// Runs detail page scraping code on the passed HTML string.
export const scrapeDetail = (html, id, slug) => {
  const $ = cheerio.load(html)
  return getDetailPage($, id, slug)
}

// Extracts all data from a detail page.
const getDetailPage = ($, id, slug) => {
  const listing = $('#content')
  const title = $('#title', listing).text().trim()
  const viewCount = parseInt($('#view-count', listing).text().trim(), 10)
  const favCount = parseInt($('#favorited-count', listing).text().trim(), 10)
  const date = parseMPDate($('#displayed-since .sentence + span', listing).text().trim())
  const $seller = $('.contact-info .top-info a', listing)
  const $sellInfo = $('.contact-info .seller-info', listing)
  //const score = parseInt($('.mp-StarRating > span', $sellInfo).text().slice(1, 2), 10)
  const seller = {
    name: $seller.text().trim(),
    url: $seller.attr('href').trim(),
    isVIP: $('span[data-id="vip-trust-indicator-badge"]', $seller).attr('aria-hidden').trim() !== 'true',
    //score,
    //scoreStr: `${score}/5`
  }
  return {
    id,
    slug,
    title,
    viewCount,
    favCount,
    seller,
    date
  }
}

// Runs a query for a detail page, extracts the information, and then returns it.
const getDetail = async params => {
  const { url } = params
  const fullURL = detailURI(url)
  const { id, slug } = extractURIInfo(fullURL)
  const html = await requestURI(fullURL)
  const data = scrapeDetail(html, id, slug)
  return {
    reqParams: params,
    reqURL: fullURL,
    data
  }
}

export default getDetail
