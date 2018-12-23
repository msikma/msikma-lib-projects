// psxdatacenter-js - Playstation DataCenter Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import toDataString from 'mlib-common/lib/output'
import discInfo from './scrape/disc'

// Runs a single action from the command line, prints the result and then exits.
export const cli = async args => {
  // Don't run this unless we came from the command line.
  if (process.env.PSXDATACENTER_JS_CLI !== '1') {
    throw new Error('Cannot use cli() except from the psxdatacenter-cli command line utility')
  }

  try {
    if (args.id) {
      const result = await discInfo(args.id)
      return outputAndExit(result, args)
    }
    else {
      console.error(`psxdatacenter-cli: error: missing ID value`)
      process.exitCode = 1
    }
  }
  catch (err) {
    const stack = String(err.stack)
    console.error(`psxdatacenter-cli: error: uncaught exception while running program:${stack ? `\n\n${stack}` : ` ${err.toString()}`}`)
    process.exitCode = 1
  }
}

// Output our results and exit the program.
const outputAndExit = (result, args) => {
  const output = toDataString(result, args.output)
  console.log(output)
  process.exitCode = 0
}

export { discInfo }
