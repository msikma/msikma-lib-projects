// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { cheerio } from 'mlib-common/lib/scrape'
import { detailURI } from './uris'
import { parseStatus, parseDelivery, parsePrice, parseMPDate } from './util'
import { removeQuery } from 'mlib-common/lib/query'
import requestURI from 'mlib-common/lib/request'

// Runs detail page scraping code on the passed HTML string.
export const scrapeDetail = (html, id, slug) => {
  const $ = cheerio.load(html)
  return getDetailPage($, id, slug)
}

// Extracts all data from a detail page.
const getDetailPage = ($, id, slug) => {
  const $listing = $('.listing')
  const title = $('#title').text().trim()
  const viewCount = parseInt($('#view-count').text().trim(), 10)
  const favCount = parseInt($('#favorited-count').text().trim(), 10)
  const date = parseMPDate($('#displayed-since .sentence + span').text().trim())
  return {
    id,
    slug,
    title,
    viewCount,
    favCount,
    date
  }
}

// Runs a query for a detail page, extracts the information, and then returns it.
const getDetail = async params => {
  const { id, category, slug } = params
  const url = detailURI({ id, category, slug })
  const html = await requestURI(url)
  const data = scrapeDetail(html, id, slug)
  return {
    reqParams: params,
    reqURL: url,
    data
  }
}

export default getDetail
