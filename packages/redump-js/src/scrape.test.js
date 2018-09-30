// buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { parseDetailPage } from './search'

describe('parseDetailPage', () => {
  it('should extract all available information', () => {
    const tests = ['4th_unit', 'abe', 'kof', 'quantum', 'summer']
    for (let name of tests) {
      const html = require(`../test/detail_${name}.html`)
      const expected = require(`../test/detail_${name}_output.json`)
      const received = parseDetailPage(html)

      expect(received).toEqual(expected)
    }
  })
})
