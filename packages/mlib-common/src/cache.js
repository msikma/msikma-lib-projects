// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { dirname } from 'path'
import { ensureDir } from './file'
import { writeFileAsync, readFileAsync, statAsync } from './promisified/fs'

// Returns cached data from a given location. If the file exists and hasn't
// gone stale yet, we'll return the data.
// 'cacheLoc' refers to the file path, and 'cacheTime' is the number
// of minutes that the cache is considered valid.
//
// If the cache is older than the 'cacheTime' permits, or the cache file cannot be found,
// this will return null instead.
export const retrieveCache = async (cacheLoc, cacheTime) => {
  try {
    const curr = (+new Date())
    const stat = await statAsync(cacheLoc)

    // If the cache is out of date, retrieve new data from live.
    if ((curr - (cacheTime * 1000 * 60)) > stat.mtimeMs) {
      return null
    }

    const data = await readFileAsync(cacheLoc)
    return JSON.parse(data)
  }
  catch (err) {
    // If something went wrong, just return null so we'll grab new data.
    return null
  }
}

export const retrieveCacheFile = async (cacheLoc, cacheTime) => {
  try {
    // Ensure that the directory at least exists.
    const dir = dirname(cacheLoc)
    await ensureDir(dir)

    // Retrieve the cache and determine if it's stale or not.
    const curr = (+new Date())
    const stat = await statAsync(cacheLoc)
    const mtime = stat.mtimeMs
    const isStale = (curr - (cacheTime * 1000 * 60)) > stat.mtimeMs
    const file = await readFileAsync(cacheLoc)
    const data = JSON.parse(file)
    const isEmpty = !data || Object.keys(data).length === 0
    return { data, mtime, isStale, isEmpty }
  }
  catch (err) {
    // If something went wrong, just return null so we'll grab new data.
    return { data: null, mtime: null, isStale: true, isEmpty: true }
  }
}

// Caches arbitrary data. The data is converted to JSON and saved as a text file in UTF8.
// As a side effect, this function also ensures that the directory the file is in exists.
const cacheData = async (data, cacheLoc) => {
  // Ensure the directory exists.
  const dir = dirname(cacheLoc)
  await ensureDir(dir)
  const jsonData = JSON.stringify(data, null, 2)
  const success = await writeFileAsync(cacheLoc, jsonData, 'utf8')
  return success
}

export default cacheData
