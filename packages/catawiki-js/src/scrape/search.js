// catawiki-js - Catawiki Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import { cheerio } from 'mlib-common/lib/scrape'
import requestURI from 'mlib-common/lib/request'
import unescape from 'lodash/unescape'
import keyBy from 'lodash/keyBy'

import { searchURI, getItemInfoURI } from './uris'

const scrapeResults = async (html, countryCode) => {
  const $ = cheerio.load(html, { decodeEntities: false })
  const mainInfo = getSearchResults($)
  const timeInfo = await getLiveUpdates(Object.values(mainInfo).map(i => i.id), countryCode)
  return Object.keys(mainInfo).map(id => ({ ...mainInfo[id], ...timeInfo[id] }))
}

const getLiveUpdates = async (ids, countryCode) => {
  const url = getItemInfoURI(ids, countryCode)
  const json = JSON.parse(await requestURI(url))
  const items = json.lots.map(i => ({ id: i.id, biddingEnd: i.bidding_end_time, currentPrice: i.current_bid_amount }))
  return keyBy(items, 'id')
}

const getSearchResults = ($, countryCode) => {
  try {
    const $info = $('#category-list-page')
    const props = JSON.parse(unescape($info.attr('data-props')))
    const items = props.results.map(i => ({
      id: i.id,
      title: i.title,
      link: i.url,
      description: i.subtitle,
      image: i.originalImageUrl,
      auctionID: i.auctionId,
      biddingStart: i.biddingStartTime
    }))
    return keyBy(items, 'id')
  }
  catch (err) {
    return []
  }
}

const listingSearch = async params => {
  const url = searchURI(params)
  const html = await requestURI(url)
  const data = await scrapeResults(html, params.countryCode)
  return {
    reqParams: params,
    reqURL: url,
    data
  }
}

export default listingSearch
