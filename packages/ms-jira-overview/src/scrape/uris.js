// ms-jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { objToParams } from 'mlib-common/lib/query'

export const baseURL = 'http://jira.theorycraft.fi'
export const dashURL = `${baseURL}/secure/Dashboard.jspa`
export const issuesURL = key => `${baseURL}/browse/${key}`
export const projectURL = key => `${baseURL}/projects/${key}/summary`

const projectsBaseURL = `${baseURL}/rest/gadget/1.0/project/generate`
const issueStatisticsBaseURL = `${baseURL}/rest/gadget/1.0/stats/generate`
const issueTableBaseURL = `${baseURL}/rest/gadget/1.0/issueTable/filter`

const columnNames = [
  'columnNames=issuetype',
  'columnNames=issuekey',
  'columnNames=summary',
  'columnNames=priority',
  'columnNames=status',
  'columnNames=assignee'
]

export const projectsURL = (projectCategory = 'dada') => (
  `${projectsBaseURL}?${objToParams({
    // Note: project category is either 'dada' or 'letsdeliver'.
    projectsOrCategories: projectCategory === 'dada' ? 'cat10000' : 'cat10003',
    showStats: true
  }, { removeEmptyString: false })}`
)

export const issueStatisticsURL = () => (
  `${issueStatisticsBaseURL}?${objToParams({
    includeResolvedIssues: false,
    projectOrFilterId: 'filter-10105',
    sortBy: 'natural',
    sortDirection: 'asc',
    statType: 'statuses'
  }, { removeEmptyString: false })}`
)

export const issueTableURL = (taskType) => (
  `${issueTableBaseURL}?${objToParams({
    num: 50,
    tableContext: 'jira.table.cols.dashboard',
    addDefault: false,
    enableSorting: true,
    paging: true,
    showActions: true,
    filterId: taskType === 'done' ? '10113' : '10112',
    sortBy: '',
    startIndex: 0
  }, { removeEmptyString: false })}&${columnNames.join('&')}`
)
