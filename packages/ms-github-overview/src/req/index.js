// ms-github-overview - Simple Github info script <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import Octokit from '@octokit/rest'
import { default as retry } from '@octokit/plugin-retry'
import { default as throttling } from '@octokit/plugin-throttling'
import cacheData, { retrieveCacheFile } from 'mlib-common/lib/cache'
import pkg from './package'

let octoInstance

const msOctokit = Octokit.plugin([
  retry,
  throttling
])

export const initAPI = () => {
  octoInstance = new msOctokit({
    auth: process.env.MS_GITHUB_OVERVIEW_TOKEN,
    userAgent: `ms-github-cli v${pkg.version}`,
    throttle: {
      onRateLimit: (retryAfter, options) => {
        console.warn(`ms-github-cli: request quota exhausted for request ${options.method} ${options.url}`)

        if (options.request.retryCount === 0) {
          console.info(`ms-github-cli: retrying after ${retryAfter} seconds.`)
          return true
        }
      },
      onAbuseLimit: (_, options) => {
        console.warn(`ms-github-cli: abuse detected for request ${options.method} ${options.url}`)
      }
    }
  })
}

export const reqNotifications = async ({ cacheLoc, cacheTime, cacheOnly, noCache }) => {
  const cacheFile = `${cacheLoc}/notifications.json`
  const cache = noCache || cacheOnly ? null : (await retrieveCacheFile(cacheFile, cacheTime))
  if (!cache.isEmpty && !cache.isStale) {
    return {
      ...cache.data,
      cache: true
    }
  }
  const res = await octoInstance.activity.listNotifications()
  const notes = res.data.map(note => {
    let url = note.subject.url
    let color = 'white'
    if (/Alert/.test(note.subject.type) || /alert/.test(note.reason)) {
      color = 'red'
    }
    if (note.subject.latest_comment_url) {
      url = note.subject.latest_comment_url
    }
    return {
      id: note.id,
      reason: note.reason,
      title: note.subject.title,
      repo: note.repository.full_name,
      private: note.repository.private,
      url,
      color
    }
  })
  const newData = {
    data: notes,
    time: (+new Date())
  }
  await cacheData(newData, cacheFile)
  return newData
}
