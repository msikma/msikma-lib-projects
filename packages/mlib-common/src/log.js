// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

// Log verbosity. 0 = normal. -1 is quiet, and above 0 is verbose.
let logLevel = 1

// Sets the current log level.
export const setLogLevel = (val) => logLevel = val

export const log = obj => logItem(obj, 0)
export const logError = obj => logItem(obj, -1)
export const logVerbose = obj => logItem(obj, 1)

const logItem = (obj, verbosity = 0) => {
  if (logLevel >= verbosity) logString(obj.toString())
}

const logString = (str) => {
  console.log(str)
}
