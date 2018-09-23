/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

import cheerio from 'cheerio'
import path from 'path'

import { readFileAsync } from '../../util/promisified/fs'
import { scrapeSearchPage } from './search'

/** Test directory in the project root. */
const testDir = path.normalize(`${__dirname}/../../../test`)

describe('scrapeSearchPage', () => {
  it('should retrieve all expected information from a search page', async () => {
    const searchPageHTML = await readFileAsync(`${testDir}/search_ポケットモンスター_2084005356.html`)
    const searchPageData = require(`${testDir}/search_ポケットモンスター_2084005356_output.json`)
    const $ = cheerio.load(searchPageHTML)

    expect(scrapeSearchPage($)).toEqual(searchPageData)
  })
})
