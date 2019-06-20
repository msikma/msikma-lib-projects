// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'
import pick from 'lodash/pick'
import keyBy from 'lodash/keyBy'
import { readFileAsync } from 'mlib-common/lib/promisified/fs'
import { url } from 'inspector';

// Container for the category data, to be loaded from a JSON file.
let categoryData = []
let categoryDataFlat = []
let allCategories = {}

// File to the category raw data retrieved/scraped from Marktplaats.
const categoryFile = path.normalize(`${__dirname}/../data/categories.json`)

/** Returns base info from a category; everything except its subcategories. */
const catBaseInfo = (c) => pick(c, ['id', 'name', 'slug', 'url'])

// Goes through every category and returns it and its subcategories as one list.
const recurseCats = (cat) => {
  const cats = []
  cats.push(catBaseInfo(cat))
  if (cat.sub) {
    cats.push(...recurseCats(cat.sub))
  }
  return cats
}

//
const loadCategories = async () => {
  categoryData = JSON.parse(await readFileAsync(categoryFile, 'utf8')).data
  categoryDataFlat = categoryData.reduce((allCats, cat) => ([...allCats, ...recurseCats(cat)]))
  allCategories = categoryDataFlat.map(c => ({ ...c, id: Number(c.id) })).keyBy(categoryDataFlat, 'id')
}

//
const listCategories = async (id) => {
  if (categoryData.length === 0) {
    await loadCategories()
  }

  const output = []

  //
  // TODO: add try/catch here
  const base = id != null ? allCategories[Number(id)] : categoryData
  base.forEach(c => output.push(catBaseInfo(c)))
  return output
}

export default listCategories
