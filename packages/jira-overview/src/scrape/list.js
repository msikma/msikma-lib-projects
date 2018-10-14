// jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'
import { cheerio } from 'mlib-common/lib/scrape'
import { readFileAsync } from 'mlib-common/lib/promisified/fs'
import requestURI from 'mlib-common/lib/request'
import { issueTableURL } from './uris'

const listProjectTasks = async () => {
  //const json = JSON.parse(await requestURI(issueTableURL()))
  const json = JSON.parse(await readFileAsync(path.normalize(`${__dirname}/../../test/issue-table.json`)))
  const $ = cheerio.load(json.table)
  const data = scrapeTasks($)
  return data
}

const scrapeTasks = ($) => {
  return $('#issuetable .issuerow').get().map(issue => {
    const type = $('.issuetype img', issue).attr('alt').trim()
    const $key = $('.issuekey .issue-link', issue)
    const link = $key.attr('href').trim()
    const key = $key.text().trim()
    const summary = $('.summary .issue-link:not(.parentIssue)', issue).text().trim()
    const priority = $('.priority img', issue).attr('alt').toLowerCase().trim()
    const status = $('.status span', issue).text().toLowerCase().trim().replace(' ', '_')
    const assignee = $('.assignee', issue).text().trim()
    const $parent = $('.summary .issue-link.parentIssue', issue)
    const parent = $parent.length ? $parent.text().trim() : null

    return {
      key,
      type,
      summary,
      link,
      priority,
      status,
      assignee,
      parent
    }
  })
}

export default listProjectTasks
