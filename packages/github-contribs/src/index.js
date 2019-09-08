// github-contribs-cli - Simple Github contribs scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import toDataString from 'mlib-common/lib/output'
import getGithubContribs from './scrape/data'

export const cli = async args => {
  try {
    if (args.action === 'data') {
      const result = await getGithubContribs(args)
      if (result.error) {
        console.error(result.error[1])
        process.exitCode = result.error[0]
        return
      }
      outputAndExit(result, args)
    }
    else {
      console.error(`github-contribs-cli: error: argument "--action": Invalid action (${args.action})`)
      process.exitCode = 1
      return
    }
  }
  catch (err) {
    console.error(`github-contribs-cli: error: uncaught exception while running task - ${err.toString()}`)
    if (err.stack) console.error(err.stack.toString());
    process.exitCode = 1
    return
  }
}

// Outputs the result and exits.
const outputAndExit = (result, args) => {
  // Don't output if we're in quiet mode.
  if (!args.quiet) {
    const output = toDataString(result, args.output)
    console.log(output)
  }
  process.exitCode = 0
  return
}
