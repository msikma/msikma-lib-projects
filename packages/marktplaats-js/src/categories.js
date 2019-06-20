// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018-2019, Michiel Sikma. MIT license.

import path from 'path'
import pick from 'lodash/pick'
import { readFileAsync } from 'mlib-common/lib/promisified/fs'

// Container for the category data, to be loaded from a JSON file.
let categoryData = []
const categoryFile = path.normalize(`${__dirname}/../data/categories.json`)

// Loads categories into memory.
export const loadCategories = async () => {
  categoryData = JSON.parse(await readFileAsync(categoryFile, 'utf8')).data
}

// Returns a list of categories. If an ID is passed, a list of subcategories is returned instead.
const listCategories = async (addSubs = false, id = null) => {
  if (categoryData.length === 0) {
    await loadCategories()
  }
  // Show subcategories, either when it's explicitly requested or when a single category ID is passed.
  const showSubCats = addSubs || id != null

  // Remove subs if we don't want them.
  const relevantCats = categoryData.map(cat => pick(cat, ['id', 'name', 'slug', 'url', ...(showSubCats ? ['sub'] : [])]))

  // Return either all categories or a specific one.
  if (id != null) {
    return relevantCats.find(cat => cat.id === Number(id))
  }
  else {
    return relevantCats
  }
}

export default listCategories
