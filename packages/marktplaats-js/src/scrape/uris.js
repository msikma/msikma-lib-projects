// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018-2019, Michiel Sikma. MIT license.

import { objToParams, removeQuery } from 'mlib-common/lib/query'
import { charTrim } from 'mlib-common/lib/util'
import { listCategoriesFlat } from '../categories'

export const baseURL = 'https://www.marktplaats.nl/'
const apiSearchURL = 'lrp/api/search'
const shortBaseURL = 'https://link.marktplaats.nl/'

const searchPage = 'z.html'

// Placeholder for the list of categories.
let categories = {}

/** Returns a short link made out of an ID. */
export const makeShortLink = (id) => (
  `${shortBaseURL}${id}`
)

/** Turns a local URL into a fully qualified one.
    If the URL is already fully qualified, or a short URL, it's returned verbatim. */
export const fullURI = (url) => {
  if (url.startsWith('http') || url.indexOf('link.marktplaats.nl') > -1) {
    return removeQuery(url)
  }
  else {
    return `${removeQuery(baseURL)}a/${url}.html`
  }
}

// Turns a full Marktplaats URL into a local one, with the domain and detail path removed.
// E.g. 'computers-en-software/kabels-en-voeding/a1196949578-blitzwolf-15w-2a-opvouwbare-draagbare-dual-usb-zonne-ene'
const makeURILocal = (uri) => (
  charTrim(removeQuery(uri)
    .replace(new RegExp('https?:\/\/(www\.)?marktplaats\.nl\/a'), '')
    .replace(new RegExp('\.html$'), ''),
  '\/')
)

// Extracts ID, categories and slug from a URL.
// E.g. 'https://www.marktplaats.nl/a/computers-en-software/kabels-en-voeding/a1196949578-blitzwolf-15w-2a-opvouwbare-draagbare-dual-usb-zonne-ene.html'
// which produces:
//
//   { id: 'm1321995147',
//     slug: 'i-pad-hoes-case-cover-pokemon-pikachu-i-pad',
//     categories:
//       [ 'computers-en-software',
//         'tablets-apple-ipad-hoezen-en-bescherming' ] }
//
export const extractURIInfo = (url) => {
  const local = makeURILocal(url)
  const pieces = local.split('\/')
  const name = pieces[2]
  const id = name.split('-', 1)[0]
  const slug = name.slice(id.length + 1)
  return { id, slug, categories: pieces.slice(0, 2) }
}

// Converts a URL starting with '/z.html', such as links in tags.
// If the given URL is falsy, an empty string is returned.
export const zToFullURI = (zURL) => (
  !zURL ? '' : `${baseURL}${zURL}`
)

/** Returns a search URI for the plain search page. */
export const searchURI = ({ query, categoryID, postcode, distance, sortBy, sortOrder, searchOnTitleAndDescription, startDateFrom }) => (
  `${baseURL}${searchPage}?${objToParams({
    query,
    categoryId: categoryID,
    postcode: postcode || '',
    distance: distance || '0',
    sortBy: sortBy || null,
    sortOrder: sortOrder || null,
    searchOnTitleAndDescription: searchOnTitleAndDescription || null,
    startDateFrom: startDateFrom || null
  })}`
)

/** Returns a search URI for the API search endpoint that returns JSON. */
export const apiSearchURI = async ({ query, attributesByKey, attributesById, categoryID, limit, offset }) => {
  // Ensure we have a list of categories.
  if (!Object.values(categories).length) {
    categories = await listCategoriesFlat()
  }

  // Convert category to the level 1 and level 2 ID keys.
  // 'l1' is a top level category and 'l2' is a subcategory.
  const catID = Number(categoryID)
  const catInfo = categories[String(categoryID)]
  // A category that has no parent is a top level category.
  const isTopCategory = catInfo.parentID == null

  // Set the l1 and l2 category IDs to the main and subcategory respectively.
  // If the target category is a main category, l2 is set to null.
  const l1Cat = isTopCategory ? catInfo : categories[String(catInfo.parentID)]
  const l2Cat = isTopCategory ? null : catInfo
  
  // Flatten key attributes object to an array of strings.
  const keyAttrValues = attributesByKey ? Object.entries(attributesByKey).reduce((items, attr) => [...items, `${attr[0]}:${attr[1]}`], []) : null
  return `${baseURL}${apiSearchURL}?${objToParams({ query, attributesByKey: keyAttrValues, attributesById, l1CategoryId: l1Cat.id, l2CategoryId: l2Cat ? l2Cat.id : null, limit, offset })}`
}
