// ms-gmail-overview - Simple Gmail scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import listEmails from './scrape/list'

// Runs a single action from the command line, prints the result and then exits.
export const cli = async args => {
  try {
    if (args.action === 'list') {
      const result = await listEmails()
      outputAndExit(result)
      process.exit(0)
    }
    else {
      console.error(`gmail-overview-cli: error: argument "--action": Invalid action (${args.action})`)
      process.exit(1)
    }
  }
  catch (err) {
    console.error(`gmail-overview-cli: error: uncaught exception while running task - ${err.toString()}`)
    process.exit(1)
  }
}

// Outputs the search results and exits.
const outputAndExit = (result) => {
  console.log(result)
  process.exit(0)
}
