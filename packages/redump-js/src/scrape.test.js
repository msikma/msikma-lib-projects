// buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import fs from 'fs'
import { readFileAsync } from 'mlib-common/lib/promisified/fs'
import { parseDetailPage } from './scrape'
import { resolve } from 'path'

describe('parseDetailPage', () => {
  it.skip('should extract all available information', async () => {
    const tests = ['4th_unit', 'abe', 'kof', 'quantum', 'summer']
    for (let name of tests) {
      const html = await readFileAsync(resolve(__dirname, `../test/detail_${name}.html`))
      const expected = require(`../test/detail_${name}_output.json`)
      const received = parseDetailPage(html)

      expect(received).toEqual(expected)
    }
  })
})
