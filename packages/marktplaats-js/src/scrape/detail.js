import { cheerio } from 'mlib-common/lib/scrape'
import requestURI from 'mlib-common/lib/request'
import { removeQuery } from 'mlib-common/lib/query'
import { detailURI } from './uris'
import { parseStatus, parseDelivery, parsePrice } from './vocab'

const parseMPDate = (date) => {
  return date
}

//
const scrapeDetail = (html, id, slug) => {
  const $ = cheerio.load(html)
  return getDetailPage($, id, slug)
}

//
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
