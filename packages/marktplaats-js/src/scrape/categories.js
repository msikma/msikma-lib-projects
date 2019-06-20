// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018-2019, Michiel Sikma. MIT license.

import { cheerio } from 'mlib-common/lib/scrape'
import { flatten } from 'mlib-common/lib/util'
import { logVerbose } from 'mlib-common/lib/log'
import { throttledRequestURI } from 'mlib-common/lib/request'
import { baseURL } from './uris'
import { getCatSlug, getCatID } from './util'

// Scrapes a page for categories.
export const scrapeCats = (html, subCats = false) => {
  const $ = cheerio.load(html)
  return getNavCategories($, subCats)
}

// Returns categories from the navigation links.
const getNavCategories = async ($, subCats = false) => {
  const links = subCats
    // Category subpage, e.g. 'https://www.marktplaats.nl/c/antiek-en-kunst/c1/antiek-eetgerei.html'
    ? $('.l2-list .quick-links li a')
    // Home.
    : $('#navigation-categories .link a')
  
  return await Promise.all(links.get().map(async link => {
    const $link = $(link)
    const url = $link.attr('href').trim()
    const name = $link.text().trim()
    const slug = getCatSlug(url).trim()
    const id = getCatID(url)
    const sub = subCats ? null : (await retrieveSubCats(url, id, slug))
    return {
      id,
      name,
      slug,
      url,
      sub
    }
  }))
}


// Returns the subpages for a main category.
// E.g. 'https://www.marktplaats.nl/c/antiek-en-kunst/c1.html'
const getCatSubpages = (html) => {
  const $ = cheerio.load(html)
  const links = $('.category-list .navigation-categories-title a')
  return links.get().map(l => $(l).attr('href'))
}

// Returns the categories listed on a subcategory page.
const getSubCategories = (html) => {
  const $ = cheerio.load(html)
  return getNavCategories($, true)
}

// Retrieves subcategories for a specific category.
const retrieveSubCats = async (url, id, slug) => {
  const html = await throttledRequestURI(url)
  logVerbose(`Subcategory ${id} (${slug}): retrieved main: ${url}`)
  const subPages = getCatSubpages(html)
  const subCats = await Promise.all(subPages.map(async link => {
    const htmlSub = await throttledRequestURI(link)
    logVerbose(`Subcategory ${id} (${slug}): retrieved sub: ${link}`)
    return getSubCategories(htmlSub)
  }))
  const allCats = flatten(subCats)
  logVerbose(`Subcategory ${id} (${slug}): found ${allCats.length} categories`)
  
  return allCats
}

// Retrieves categories.
const retrieveCategories = async () => {
  const html = await throttledRequestURI(baseURL)
  logVerbose(`Retrieved category main: ${baseURL}`)
  const navCats = await scrapeCats(html)
  logVerbose(`Scraped ${navCats.length} main categories`)
  return {
    reqURL: baseURL,
    data: navCats
  }
}

export default retrieveCategories
