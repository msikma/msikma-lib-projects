// redump-js - Redump Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

export const BASE_URL = 'http://redump.org/'
export const DISC_URL = `${BASE_URL}disc/`
export const DISCS_URL = `${BASE_URL}discs/`
export const SEARCH_URL = `${BASE_URL}results/`

/** Returns a URL segment if it has a value; empty string otherwise. */
const urlSeg = (k, v) => v ? `${k}/${v}/` : ''

// E.g. http://redump.org/discs/region/Eu/letter/m/?page=2
export const browseURL = (system, letter, region, page) => [
  `${DISCS_URL}`,
  urlSeg('system', system),
  urlSeg('region', region),
  urlSeg('letter', letter),
  `${page ? `?page=${page}` : ''}`
].join('')

// E.g. http://redump.org/disc/37036/
export const detailURL = (id) => `${DISC_URL}${encodeURIComponent(id)}/`
