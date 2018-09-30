// buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import cheerio from 'cheerio'
import requestURI from 'web-scrapers-common/utils/request'

import { ensureFullURI } from '../uris'
import { getIDFromURL, scrapePrice } from './helpers'

/** Retrieves HTML from a search url and scrapes out any product items found there. */
export const fetchSearchData = async url => {
  const html = await requestURI(url)
  const $html = cheerio.load(html)

  return scrapeSearchPage($html, url)
}

/** Scrapes a search result page and returns product items found there. */
export const scrapeSearchPage = ($, url) => {
  const products = $('.product_field.list_layout .product_whole').get()

  const items = products.map(scrapeSingleResult($))

  return {
    items
  }
}

/**
 * Scrapes a single search result. Only limited data is found here.
 *
 * Note: currency representation uses the ISO 4217 currency code list, e.g. JPY for Japanese Yen.
 *
 * Example HTML:
 *
 *   <li class="product_whole">
 *     <a href="/item/yahoo/auction/f280343248" data-bind="click: $root.ec.onProductClick.bind($root.ec, 0)">
 *       <div class="image_container">
 *         <div class="product_image_wrap">
 *           <img class="product_image" alt="バンプレスト ONE PIECE　ワンピース DX海軍 プラ" data-src="https://wing-auctions.c.yimg.jp/sim?furl=auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0407/users/0/2/3/7/gotetsuheizou-img900x1200-1531541130l1oyfd8060.jpg&amp;dc=1&amp;sr.fs=20000"
 *             src="https://wing-auctions.c.yimg.jp/sim?furl=auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0407/users/0/2/3/7/gotetsuheizou-img900x1200-1531541130l1oyfd8060.jpg&amp;dc=1&amp;sr.fs=20000">
 *         </div>
 *         <div class="product_em_status_brandnew"><p class="its_new buyeeicon-brandnew"></p></div>
 *         <div class="product_em_status_bids">
 *           <p class="bidders"><i class="buyeeicon-bids">1</i></p>
 *         </div>
 *       </div>
 *       <div class="product_info">
 *         <p class="product_title">バンプレスト ONE PIECE　ワンピース DX海軍 プライズ</p>
 *         <p class="product_remaining"><i class="generalicon-clock">2 day(s)</i></p>
 *         <p class="product_price">1,000 yen<br><span class="small">(€8,00)</span></p>
 *         <p class="product_bidorbuy">ー<br><span class="small">(ー)</span></p>
 *         <ul class="product_status_list"></ul>
 *       </div>
 *     </a>
 *     <a data-bind="click: search.bind($data, { seller: 'gotetsuheizou' })" class="product_seller">
 *       <i class="buyeeicon-shop">gotetsuheizou</i>
 *     </a>
 *   </li>
 */
const scrapeSingleResult = $ => item => {
  const priceObject = scrapePrice($, item)
  const link = ensureFullURI($('> a', item).attr('href').trim())
  return {
    id: getIDFromURL(link),
    title: $('.product_title', item).text().trim(),
    link,
    thumbnail: $('.product_image[data-src]', item).attr('data-src').trim(),

    // Details is empty for now, until we get extended information.
    details: {
    },
    price: {
      currentPrice: priceObject,
      numberOfBids: Number($('.product_em_status_bids', item).text().trim())
    },
    time: {
      isNewlyListed: $('.its_new', item).length > 0,
      timeRemaining: $('.product_remaining', item).text().trim()
    },
    seller: {
      name: $('.product_seller', item).text().trim()
    }
  }
}
