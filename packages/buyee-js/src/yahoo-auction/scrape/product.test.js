// buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import cheerio from 'cheerio'
import path from 'path'
import { writeFileAsync } from '../../util/promisified/fs'

import { readFileAsync } from '../../util/promisified/fs'
import { scrapeProductPage } from './product'

/** Test directory in the project root. */
const testDir = path.normalize(`${__dirname}/../../../test`)

describe('scrapeProductPage', () => {
  it('should retrieve all expected information from a product detail page', async () => {
    const productPageHTML = await Promise.all([
      readFileAsync(`${testDir}/auction_l389909557.html`, 'utf8'),
      readFileAsync(`${testDir}/auction_r219564858.html`, 'utf8'),
      readFileAsync(`${testDir}/auction_r256784712.html`, 'utf8')
    ])
    const productPageData = [
      require(`${testDir}/auction_l389909557_output.json`),
      require(`${testDir}/auction_r219564858_output.json`),
      require(`${testDir}/auction_r256784712_output.json`)
    ]
    const productPageURL = [
      'https://buyee.jp/item/yahoo/auction/l389909557',
      'https://buyee.jp/item/yahoo/auction/r219564858',
      'https://buyee.jp/item/yahoo/auction/r256784712'
    ]

    // Check every item with its expected output.
    for (let a = 0; a < productPageHTML.length; ++a) {
      expect(scrapeProductPage(cheerio.load(productPageHTML[a]), productPageURL[a])).toEqual(productPageData[a])
    }
  })
})
