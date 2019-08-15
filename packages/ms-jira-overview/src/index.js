// ms-jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import toDataString from 'mlib-common/lib/output'
import getProjectTasks from './scrape/data'
import listTickets from './scrape/list'

// Runs a single action from the command line, prints the result and then exits.
export const cli = async args => {
  try {
    if (args.action === 'data' || args.action === 'list') {
      const result = await getProjectTasks(args)
      if (result.error) {
        console.error(result.error[1])
        process.exitCode = result.error[0]
        return
      }
      if (args.action === 'data') outputAndExit(result, args)
      if (args.action === 'list') outputListAndExit(result, args)
      process.exitCode = 0
      return
    }
    else {
      console.error(`ms-jira-cli: error: argument "--action": Invalid action (${args.action})`)
      process.exitCode = 1
      return
    }
  }
  catch (err) {
    console.error(`ms-jira-cli: error: uncaught exception while running task - ${err.toString()}`)
    if (err.stack) console.error(err.stack.toString());
    process.exitCode = 1
    return
  }
}

// Outputs the new items as a list.
const outputListAndExit = (result, args) => {
  // Don't output if we're in quiet mode, and skip if there's nothing.
  if (!args.cache_only) {
    listTickets(result, args)
  }
  process.exitCode = 0
  return
}

// Outputs the search results and exits.
const outputAndExit = (result, args) => {
  // Don't output if we're in quiet mode.
  if (!args.quiet) {
    const output = toDataString(result, args.output)
    console.log(output)
  }
  process.exitCode = 0
  return
}
