// ms-jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import path from 'path'
import get from 'lodash/get'

import cacheData, { retrieveCache } from 'mlib-common/lib/cache'
import requestURI, { loadCookieFile } from 'mlib-common/lib/request'
import { cheerio } from 'mlib-common/lib/scrape'

import { simplifyStatus } from './util'
import { issueTableURL, projectsURL, issueStatisticsURL } from './uris'

const getProjectTasks = async (args) => {
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

    // If not, scrape all issues and return them.
    const $notDone = cheerio.load(data.notDoneData.table)
    const $done = cheerio.load(data.doneData.table)
    const notDone = scrapeTasks($notDone)
    const done = scrapeTasks($done)
    const statistics = parseStatistics(data.statisticsData)
    const projects = { dada: parseProjects(data.projectsDadaData), letsDeliver: parseProjects(data.projectsLDData) }

    const jiraData = { tasks: [...done, ...notDone], statistics, projects }

    // Save to cache.
    await cacheData(jiraData, args.cache_loc)

    return jiraData
  }
  else {
    // Cached data has already been processed.
    return data
  }
}

const reqProjectTasks = async (cookieLoc) => {
  const cookieFile = cookieLoc ? cookieLoc : path.normalize(path.join(process.env.HOME, '.config', 'ms-jira-js', 'cookies.txt'))
  const cookieJar = await loadCookieFile(cookieFile)

  const issueStatistics = requestURI(issueStatisticsURL(), false, {}, false, { jar: cookieJar, gzip: true })

  const notDoneIssues = requestURI(issueTableURL('notDone'), false, {}, false, { jar: cookieJar, gzip: true })
  const doneIssues = requestURI(issueTableURL('done'), false, {}, false, { jar: cookieJar, gzip: true })

  const projectListDada = requestURI(projectsURL('dada'), false, {}, false, { jar: cookieJar, gzip: true })
  const projectListLD = requestURI(projectsURL('letsdeliver'), false, {}, false, { jar: cookieJar, gzip: true })

  const data = await Promise.all([notDoneIssues, doneIssues, issueStatistics, projectListDada, projectListLD])

  // If we see 'unauthorized' in the response, it probably means our cookies seem to be outdated.
  if (~data[0].indexOf('Unauthorized (401)')) {
    throw new Error(`Unauthorized (401) - cookies.txt is likely outdated: ${cookieLoc}`)
  }

  return {
    notDoneData: JSON.parse(data[0]),
    doneData: JSON.parse(data[1]),
    statisticsData: JSON.parse(data[2]),
    projectsDadaData: JSON.parse(data[3]),
    projectsLDData: JSON.parse(data[4])
  }
}

const parseProjects = (projectsData) => {
  const inner = projectsData.categories[0]
  const catID = inner.id
  const catName = inner.name
  const catProjects = inner.projects
  const simplifiedProjects = catProjects.map(proj => {
    const { id, key, name, leadUserName, leadFullName, projectDescription, openIssues } = proj
    const $desc = projectDescription ? cheerio.load(projectDescription) : null
    const description = projectDescription ? $desc.text() : null
    return {
      id: String(id),
      key,
      name,
      lead: {
        username: leadUserName,
        fullname: leadFullName
      },
      description,
      issueOverview: openIssues.map(issue => ({
        color: issue.colour,
        width: issue.width,
        label: issue.altText.replace('(1 Issues)', '(1 Issue)'),
        priority: Number(issue.priority)
      }))
    }
  })
  return {
    id: catID,
    name: catName,
    projects: simplifiedProjects
  }
}

const parseStatistics = (statisticsData) => {
  const statRows = statisticsData.rows.map(row => {
    const { html, count, percentage } = row
    const $html = cheerio.load(html)
    const $span = $html('span')
    const status = simplifyStatus($span.text().trim())
    return {
      status,
      count,
      percentage
    }
  })
  return {
    issueStatus: statRows,
    issueCount: statisticsData.totalIssueCount
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
    const status = simplifyStatus($('.status span', issue).text())
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

export default getProjectTasks
