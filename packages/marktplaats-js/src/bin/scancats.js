#!/usr/bin/env node
// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

// This script scans all available categories on Marktplaats and generates a list.

import '@babel/polyfill'
import requestURI from 'mlib-common/lib/request'
import makeArgParser from 'mlib-common/lib/argparse'
import retrieveCategories from '../scrape/categories'
import { writeFileAsync, accessAsync, constants } from 'mlib-common/lib/promisified/fs'
import { resolve } from 'path'
const outputDir = resolve(__dirname, '../../')
const outputFile = `${outputDir}/categories-out.json`

const packageData = require('../../package.json')
const parser = makeArgParser({
  addHelp: true,
  description: `Scanner utility that finds and lists all extant Marktplaats categories.\nResults are saved as 'categories-out.json' in the package root.\n`,
  version: packageData.version
})
parser.parseArgs()

// Saves category data, or reports error if the writing failed.
const saveCatData = async data => {
  try {
    await writeFileAsync(outputFile, JSON.stringify(data, null, 2))
  }
  catch (err) {
    parser.error(err)
  }
}

// Checks whether we have the rights to write the output file.
const checkRights = async () => {
  try {
    await accessAsync(outputDir, constants.W_OK)
  }
  catch (err) {
    parser.error(err)
  }
}

const main = async () => {
  checkRights()
  saveCatData(await retrieveCategories())
}

main();
