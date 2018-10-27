// jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'
import get from 'lodash/get'
import { cheerio } from 'mlib-common/lib/scrape'
import requestURI, { loadCookieFile } from 'mlib-common/lib/request'
import { issueTableURL } from './uris'

const listProjectTasks = async () => {
  const json = await reqProjectTasks()

  // Throw here if we received an error message from Jira.
  if (get(json, 'errors.length', 0) > 0) {
    throw new Error(`${json.errors[0].field}: ${json.errors[0].error}`)
  }

  // If not, scrape all issues and return them.
  const $ = cheerio.load(json.table)
  const data = scrapeTasks($)
  return data
}

const reqProjectTasks = async () => {
  const cookieFile = path.normalize(path.join(process.env.HOME, '.config', 'jirajs', 'cookies.txt'))
  const cookieJar = await loadCookieFile(cookieFile)
  const issues = await requestURI(issueTableURL(), false, {}, false, { jar: cookieJar })
  const json = JSON.parse(issues)
  return json
}

export const scrapeTasks = ($) => {
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
