// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018-2019, Michiel Sikma. MIT license.

import path from 'path'
import { readFileAsync } from 'mlib-common/lib/promisified/fs'
import { scrapeDetail } from './detail'

/** Container for the test's parsed data. */
let data = null

/** Test directory in the project root. */
const testDir = path.normalize(`${__dirname}/../../test`)

// Read the test file and pass it through the scraper function.
beforeEach(async () => {
  data = scrapeDetail(await readFileAsync(`${testDir}/detail-msx.html`, 'utf8'), 'id', 'slug')
})

// 'data' should have a form similar to this:
//
// { id: 'id',
//   slug: 'slug',
//   title: 'MSX BASE Floppy + handleiding',
//   viewCount: 54,
//   favCount: 0,
//   date: '2018-06-27T23:21:00.000Z' }

describe('scrapeDetail()', async () => {
  describe('parsed data is correct if', async () => {
    it('is a valid data object', async () => expect(typeof data).toBe('object'))
    it('has a valid ID', async () => expect(data.id).toBe('id'))
    it('has the expected title', async () => expect(data.title).toBe('MSX BASE Floppy + handleiding'))
    it('has the right view count', async () => expect(data.viewCount).toBe(54))
    it('has the right fav count', async () => expect(data.favCount).toBe(0))
    it('has the correct date', async () => expect(data.date).toEqual(new Date('2018-06-27T23:21:00.000Z')))
  })
})
