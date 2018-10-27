// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { userInfo } from 'os'
import mkdirp from 'mkdirp'

const info = userInfo()

export const expandTilde = (filename) => {
  const userDir = info.homedir
  return filename.replace(/^~/, userDir)
}

export const ensureDir = (path) => new Promise((resolve, reject) => (
  mkdirp(path, (err) => {
    if (err) return reject(err)
    return resolve(true)
  })
))
