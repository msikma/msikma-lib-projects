// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { objToParams } from 'mlib-common/lib/query'

const baseURL = 'https://www.marktplaats.nl/'

const searchPage = 'z.html'

export const detailURI = ({ id, slug = '', category = ['', ''] }) => (
  `${baseURL}a/${category[0]}/${category[1]}/${id}-${slug}.html`
)

export const searchURI = ({ query, categoryID, postcode, distance}) => (
  `${baseURL}${searchPage}?${objToParams({
    query,
    categoryId: categoryID,
    postcode: postcode || '',
    distance: distance || '0'
  })}`
)
