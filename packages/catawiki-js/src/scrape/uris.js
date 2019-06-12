// catawiki-js - Catawiki Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import { objToParams } from 'mlib-common/lib/query'

export const baseURL = (tld = 'com') => `https://www.catawiki.${tld}/`

/** Returns a search URI. */
// https://www.catawiki.nl/s/?q=street&sort=relevancy_desc
// https://www.catawiki.nl/c/365?q=street
export const searchURI = ({ query, categoryID, countryCode = 'com' }) => (
  `${baseURL(countryCode)}${categoryID ? `c/${categoryID}` : 's/'}?${objToParams({ q: query })}`
)

/** Returns an URI that will give more info about a list of items by their IDs. */
export const getItemInfoURI = (ids, countryCode = 'com') => (
  `${baseURL(countryCode)}/buyer/api/v1/lots/live?ids=${ids.join('%2C')}`
)
