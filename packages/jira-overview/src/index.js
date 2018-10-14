// jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import listProjectTasks from './scrape/list'

// Runs a single action from the command line, prints the result and then exits.
export const cli = async args => {
  // Don't run this unless we came from the command line.
  if (process.env.JIRA_OVERVIEW_JS_CLI !== '1') {
    throw new Error('Cannot use cli() except from the jira-overview-cli command line utility')
  }

  try {
    if (args.action === 'list') {
      const result = await listProjectTasks()
      outputAndExit(result)
      process.exit(0)
    }
    else {
      console.error(`jira-overview-cli: error: argument "--action": Invalid action (${args.action})`)
      process.exit(1)
    }
  }
  catch (err) {
    console.error(`jira-overview-cli: error: uncaught exception while running task - ${err.toString()}`)
    process.exit(1)
  }
}

// Outputs the search results and exits.
const outputAndExit = (result) => {
  console.log(result)
  process.exit(0)
}
