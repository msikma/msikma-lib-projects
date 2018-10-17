// jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'
import { cheerio } from 'mlib-common/lib/scrape'
import { readFileAsync } from 'mlib-common/lib/promisified/fs'
import { scrapeTasks } from './list'

const TEST_TABLE = path.normalize(`${__dirname}/../../test/issue-table.json`)

describe('scrapeTasks()', async () => {
  describe('issue table is correctly parsed if', async () => {
    // Load test issue table response and parse its data.
    const json = JSON.parse(await readFileAsync(TEST_TABLE))
    const data = scrapeTasks(cheerio.load(json.table))

    it('is a valid data object', async () => expect(typeof data).toBe('object'))
  })
})
