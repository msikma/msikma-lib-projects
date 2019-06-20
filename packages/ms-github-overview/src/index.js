// ms-github-overview - Simple Github info script <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import toDataString from 'mlib-common/lib/output'
import { initAPI, reqNotifications } from './req'

// Runs a single action from the command line, prints the result and then exits.
export const cli = async args => {
  try {
    if (args.action === 'notes') {
      initAPI()
      const result = await reqNotifications(args)
      outputAndExit(result, args)
      process.exitCode = 0
      return
    }
    else {
      console.error(`ms-github-cli: error: argument "--action": Invalid action (${args.action})`)
      process.exitCode = 1
      return
    }
  }
  catch (err) {
    console.error(`ms-github-cli: error: uncaught exception while running task - ${err.toString()}`)
    process.exitCode = 1
    return
  }
}

// Outputs the search results and exits.
const outputAndExit = (result, args) => {
  // Don't output if we're in quiet mode.
  if (!args.cache_only) {
    const output = toDataString(result, args.output)
    console.log(output)
  }
  process.exitCode = 0
  return
}
