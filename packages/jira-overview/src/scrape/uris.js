// jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { objToParams } from 'mlib-common/lib/query'
export const baseURL = 'http://jira.theorycraft.fi'
export const dashURL = `${baseURL}/secure/Dashboard.jspa`
const issueTableBaseURL = `${baseURL}/rest/gadget/1.0/issueTable/filter`

const columnNames = [
  'columnNames=issuetype',
  'columnNames=issuekey',
  'columnNames=summary',
  'columnNames=priority',
  'columnNames=status',
  'columnNames=assignee'
]

export const issueTableURL = () => (
  `${issueTableBaseURL}?${objToParams({
    num: 50,
    tableContext: 'jira.table.cols.dashboard',
    addDefault: false,
    enableSorting: true,
    paging: true,
    showActions: true,
    filterId: 10105,
    sortBy: '',
    startIndex: 0
  }, { removeEmptyString: false })}&${columnNames.join('&')}`
)
