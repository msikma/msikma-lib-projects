// jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import toDataString from 'mlib-common/lib/output'
import listProjectTasks from './scrape/list'

// Runs a single action from the command line, prints the result and then exits.
export const cli = async args => {
  try {
    if (args.action === 'list') {
      const result = await listProjectTasks(args)
      outputAndExit(result, args)
      process.exitCode = 0
    }
    else {
      console.error(`jira-overview-cli: error: argument "--action": Invalid action (${args.action})`)
      process.exitCode = 1
    }
  }
  catch (err) {
    console.error(`jira-overview-cli: error: uncaught exception while running task - ${err.toString()}`)
    process.exitCode = 1
  }
}

// Outputs the search results and exits.
const outputAndExit = (result, args) => {
  const output = toDataString(result, args.output)
  console.log(output)
  process.exitCode = 0
}
