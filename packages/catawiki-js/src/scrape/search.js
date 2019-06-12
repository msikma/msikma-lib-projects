// catawiki-js - Catawiki Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import { cheerio } from 'mlib-common/lib/scrape'
import requestURI from 'mlib-common/lib/request'
import unescape from 'lodash/unescape'
import keyBy from 'lodash/keyBy'

import { searchURI, getItemInfoURI } from './uris'

/** Parses a time such as '19u 24m 15s' into a Date() object. */
/*const parseDeadline = timeStr => {
  const unitArr = timeStr.match(/([a-z]{1}).+?([a-z]{1}).+?([a-z]{1})/i)
  if (!unitArr || unitArr.length < 4) return null
  const units = { h: unitArr[1], m: unitArr[2], s: unitArr[3] }
  const timeArr = timeStr.match(new RegExp(`([0-9]{1,2})${units.h}\\s*([0-9]{1,2})${units.m}\\s*([0-9]{1,2})${units.s}`, 'i')).map(t => Number(t))
  if (!values || values.length < 4) return null
  const time = { h: timeArr[1], m: timeArr[2], s: timeArr[3] }

  const date = new Date()
  date.setHours(a.getHours() + (time.h))
  date.setMinutes(a.getMinutes() + (time.m))
  date.setSeconds(a.getSeconds() + (time.s))

  return date
}*/

const scrapeResults = async (html, countryCode) => {
  const $ = cheerio.load(html, { decodeEntities: false })
  const mainInfo = getSearchResults($)
  const timeInfo = await getLiveUpdates(Object.values(mainInfo).map(i => i.id), countryCode)
  console.log('==')
  console.log(timeInfo)
  return Object.keys(mainInfo).map(id => ({ ...mainInfo[id], ...timeInfo[id] }))
}

const getLiveUpdates = async (ids, countryCode) => {
  const url = getItemInfoURI(ids, countryCode)
  const json = JSON.parse(await requestURI(url))
  const items = json.lots.map(i => ({ id: i.id, biddingEnd: i.bidding_end_time, currentPrice: i.current_bid_amount }))
  return keyBy(items, 'id')
}

/** Turns a thumbnail image into a full size image, if possible. */
// https://assets.catawiki.nl/assets/2019/6/3/7/4/2/thumb2_74268b9f-09ea-4c1b-9148-767e08b70aae.jpg
// https://assets.catawiki.nl/assets/2019/6/3/7/4/2/74268b9f-09ea-4c1b-9148-767e08b70aae.jpg
/*const makeFullImage = (thumb) => (
  thumb ? thumb.replace('thumb2_', '') : null
)*/

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
  /*
  const lots = $('.be-lot-list .be-lot')
  const mainInfo = lots.get().map(lot => {
    const $lot = $(lot)
    const href = $('a.c-card', $lot).attr('href')
    const title = $('.be-lot__title', $lot).text().trim()
    const $desc = $('.be-lot__description', $lot)
    $('.c-link', $desc).remove()
    const desc = $desc.text().trim()
    const deadlineRaw = $('.u-text-tabular-figures', $lot).text().trim()
    const deadline = parseDeadline(deadlineRaw)
    const price = $('.be-lot__price', $lot).text().trim().replace(new RegExp('\\s*([0-9])'), '$1')
    const image = makeFullImage($('.c-card__image img', $lot).attr('src'))
    return {
      title,
      link: href,
      description: desc,
      deadline,
      currentPrice: price,
      image
    }
  })*/
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
