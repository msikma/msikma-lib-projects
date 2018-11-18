// ms-jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'
import get from 'lodash/get'
import { cheerio } from 'mlib-common/lib/scrape'
import requestURI, { loadCookieFile } from 'mlib-common/lib/request'
import { issueTableURL } from './uris'
import cacheTasks, { retrieveCache } from './cache'

const listProjectTasks = async (args) => {
  // Retrieve cache, unless the user specified not to use it.
  let data = args.no_cache ? null : (await retrieveCache(args.cache_loc, args.cache_time))
  if (!data) {
    data = await reqProjectTasks(args.cookie_loc)
    // Throw here if we received an error message from Jira.
    if (get(data.notDoneData, 'errors.length', 0) > 0) {
      throw new Error(`${data.notDoneData.errors[0].field}: ${data.notDoneData.errors[0].error} (notDoneData)`)
    }
    if (get(data.doneData, 'errors.length', 0) > 0) {
      throw new Error(`${data.doneData.errors[0].field}: ${data.doneData.errors[0].error} (doneData)`)
    }
  }
  else {
    // Cached data has already been processed.
    return data
  }

  // If not, scrape all issues and return them.
  const $notDone = cheerio.load(data.notDoneData.table)
  const $done = cheerio.load(data.doneData.table)
  const notDone = scrapeTasks($notDone)
  const done = scrapeTasks($done)

  const tasks = [...done, ...notDone]

  // Save to cache.
  await cacheTasks(tasks, args.cache_loc)

  return tasks
}

const reqProjectTasks = async (cookieLoc) => {
  const cookieFile = cookieLoc ? cookieLoc : path.normalize(path.join(process.env.HOME, '.config', 'ms-jira-js', 'cookies.txt'))
  const cookieJar = await loadCookieFile(cookieFile)
  const notDoneIssues = requestURI(issueTableURL('notDone'), false, {}, false, { jar: cookieJar })
  const doneIssues = requestURI(issueTableURL('done'), false, {}, false, { jar: cookieJar })
  const issues = await Promise.all([notDoneIssues, doneIssues])

  return {
    notDoneData: JSON.parse(issues[0]),
    doneData: JSON.parse(issues[1])
  }
}

export const scrapeTasks = ($) => {
  return $(`#issuetable .issuerow`).get().map(issue => {
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
