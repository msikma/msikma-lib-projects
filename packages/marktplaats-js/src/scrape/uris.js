// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { objToParams, removeQuery } from 'mlib-common/lib/query'
import { charTrim } from 'mlib-common/lib/util'

export const baseURL = 'https://www.marktplaats.nl/'
const shortBaseURL = 'https://link.marktplaats.nl/'

const searchPage = 'z.html'

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

export const searchURI = ({ query, categoryID, postcode, distance}) => (
  `${baseURL}${searchPage}?${objToParams({
    query,
    categoryId: categoryID,
    postcode: postcode || '',
    distance: distance || '0'
  })}`
)
