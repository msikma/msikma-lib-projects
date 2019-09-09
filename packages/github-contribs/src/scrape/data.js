// github-contribs-cli - Simple Github contribs scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import cacheData, { retrieveCache } from 'mlib-common/lib/cache'
import { sortObjKeys } from 'mlib-common/lib/sort'
import requestURI from 'mlib-common/lib/request'
import { cheerio } from 'mlib-common/lib/scrape'
import { trimInner } from 'mlib-common/lib/text'

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
  
  const $userInfo = $('.h-card')
  const $avatar = $('img.avatar.width-full', $userInfo)
  const avatarURL = $avatar.attr('src').trim()
  const avatarWidth = Number($avatar.attr('width').trim())
  const avatarHeight = Number($avatar.attr('height').trim())
  const fullname = $('.vcard-fullname', $userInfo).text().trim()
  const username = $('.vcard-username', $userInfo).text().trim()
  const biography = $('.user-profile-bio', $userInfo).text().trim()
  const organization = $('.vcard-detail .p-org', $userInfo).text().trim()
  const location = $('.vcard-detail .p-label', $userInfo).text().trim()
  const website = $($('.vcard-detail[data-test-selector="profile-website-url"]', $userInfo).get()[0]).text().trim()
  
  let cInfo
  let cNumber
  try {
    cInfo = trimInner($('.js-yearly-contributions > div > h2').text().trim())
  } catch (err) {
  }
  try {
    cNumber = Number(cInfo.match(/[0-9,]+/)[0].replace(',', ''))
  } catch (err) {
  }
  return {
    dates: sortObjKeys(cDates),
    info: { headline: cInfo, amount: cNumber },
    user: {
      username,
      fullname,
      biography,
      website,
      organization,
      avatar: {
        url: avatarURL,
        width: avatarWidth,
        height: avatarHeight
      },
      location
    }
  }
}

const reqGithubContribs = async (username) => {
  const contribs = await requestURI(userURL(username), false, {}, false, { gzip: true })
  return contribs
}

export default getGithubContribs
