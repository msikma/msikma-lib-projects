// github-contribs-cli - Simple Github contribs scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import cacheData, { retrieveCache } from 'mlib-common/lib/cache'
import { sortObjKeys } from 'mlib-common/lib/sort'
import requestURI from 'mlib-common/lib/request'
import { cheerio } from 'mlib-common/lib/scrape'

import { userURL } from './uris'

const getGithubContribs = async (args) => {
  // Retrieve cache, unless the user specified not to use it.
  const data = args.no_cache ? null : (await retrieveCache(args.cache_loc, args.cache_time))
  if (data) return data

  const contribsData = parseContribs(await reqGithubContribs(args.username))
  const userData = { contributions: contribsData }
  await cacheData(userData, args.cache_loc)
  return userData
}

const parseContribs = html => {
  const $ = cheerio.load(html)
  const cItems = $('svg.js-calendar-graph-svg > g > g > rect').get()
  const cDates = cItems.reduce((all, item) => {
    const $date = $(item)
    return {
      ...all,
      [$date.attr('data-date').trim()]: {
        count: Number($date.attr('data-count')),
        color: $date.attr('fill')
      }
    }
  }, {})
  return { dates: sortObjKeys(cDates) }
}

const reqGithubContribs = async (username) => {
  const contribs = await requestURI(userURL(username), false, {}, false, { gzip: true })
  return contribs
}

export default getGithubContribs
