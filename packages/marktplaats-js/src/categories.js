// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018-2019, Michiel Sikma. MIT license.

import path from 'path'
import pick from 'lodash/pick'
import keyBy from 'lodash/keyBy'
import { readFileAsync } from 'mlib-common/lib/promisified/fs'

// Container for the category data, to be loaded from a JSON file.
let categoryData = []
let categoryDataFlat = []
let allCategories = {}

// File to the category raw data retrieved/scraped from Marktplaats.
const categoryFile = path.normalize(`${__dirname}/../data/categories.json`)

/** Returns base info from a category; everything except its subcategories. */
const catBaseInfo = (c, isSubcat = false, parentID = null) => ({
  ...pick({ ...c }, ['id', 'name', 'slug', 'url']),
  ...(isSubcat ? { isSubcat: true } : {}),
  ...(parentID ? { parentID } : {})
})

// Goes through every category and returns it and its subcategories as one list.
const recurseCats = (cat, isSubcat = false, parentID = null) => {
  const cats = []
  if (Array.isArray(cat)) {
    for (const sub of cat) {
      sub.id && cats.push(catBaseInfo(sub, isSubcat, parentID))
    }
  }
  else {
    cat.id && cats.push(catBaseInfo(cat, isSubcat, parentID))
  }
  if (cat.sub && cat.sub.length > 0) {
    cats.push(...recurseCats(cat.sub, true, cat.id))
  }
  return cats
}

// Loads categories into memory.
export const loadCategories = async () => {
  categoryData = JSON.parse(await readFileAsync(categoryFile, 'utf8')).data
  categoryDataFlat = categoryData.reduce((allCats, cat) => ([...allCats, ...recurseCats(cat)]), [])
  allCategories = keyBy(categoryDataFlat.map(c => ({ ...c, id: Number(c.id) })), 'id')
}

// Returns all categories as an object.
export const listCategoriesFlat = async () => {
  if (categoryData.length === 0) {
    await loadCategories()
  }
  return allCategories
}

// Returns a list of categories. If an ID is passed, a list of subcategories is returned instead.
const listCategories = async (addSubs = false, catsCatID = null) => {
  if (categoryData.length === 0) {
    await loadCategories()
  }

  // Add either all categories, or a specific category ID to the output.
  // Add either only the main categories, or subcategories as well.
  const output = []
  const idVal = Number(catsCatID)
  const base = catsCatID != null ? recurseCats(categoryData.find(n => n.id === idVal)) : allCategories
  for (const item of Object.values(base)) {
    if (addSubs || (!addSubs && !item.isSubcat)) {
      output.push(item)
    }
  }
  return output
}

export default listCategories
