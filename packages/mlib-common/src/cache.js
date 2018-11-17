// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { dirname } from 'path'
import { ensureDir } from './file'
import { writeFileAsync, readFileAsync, statAsync } from './promisified/fs'

// Returns cached data from a given location. If the file exists and hasn't
// gone stale yet, we'll return the data.
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

const cacheTasks = async (tasks, cacheLoc) => {
  // Ensure the directory exists.
  const dir = dirname(cacheLoc)
  await ensureDir(dir)
  const data = JSON.stringify(tasks, null, 2)
  const success = await writeFileAsync(cacheLoc, data)
  return success
}

export default cacheTasks
