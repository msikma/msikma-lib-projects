// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'
import pick from 'lodash/pick'
import { readFileAsync } from 'mlib-common/lib/promisified/fs'
import { url } from 'inspector';

// Container for the category data, to be loaded from a JSON file.
let categoryData = []
const categoryFile = path.normalize(`${__dirname}/../data/categories.json`)

//
const loadCategories = async () => {
  categoryData = JSON.parse(await readFileAsync(categoryFile, 'utf8')).data

}

//
const listCategories = async (id) => {
  if (categoryData.length === 0) {
    await loadCategories()
  }

  const output = []

  //
  const base = id != null ? categoryData.find(c => c.id === Number(id)) : categoryData
  base.forEach(c => output.push(pick(c, ['id', 'name', 'slug', 'url'])))

  return output
}

export default listCategories
