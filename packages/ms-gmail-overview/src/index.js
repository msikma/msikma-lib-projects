// ms-gmail-overview - Simple Gmail scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import toDataString from 'mlib-common/lib/output'
import getInbox from './scrape/data'
import listEmails from './scrape/list'
import { dbInit } from './scrape/cache'

// Runs a single action from the command line, prints the result and then exits.
export const cli = async args => {
  try {
    if (args.action === 'list') {
      // Initialize the database if we're listing mails, to see which ones are already read.
      dbInit(args.db_loc)
    }
    if (args.action === 'data' || args.action === 'list') {
      const result = await getInbox(args)
      if (result.error) {
        console.error(result.error[1])
        process.exitCode = result.error[0]
        return
      }
      if (args.action === 'data') outputAndExit(result, args)
      if (args.action === 'list') outputListAndExit(result, args)
      return
    }
    else {
      console.error(`ms-gmail-cli: error: argument "--action": Invalid action (${args.action})`)
      process.exitCode = 1
      return
    }
  }
  catch (err) {
    console.error(`ms-gmail-cli: error: uncaught exception while running task - ${err.toString()}`)
    process.exitCode = 1
    return
  }
}

// Outputs the new mails as a list.
const outputListAndExit = (result, args) => {
  // Don't output if we're in quiet mode, and skip if there's nothing.
  if (!args.cache_only && result && result.inbox && result.inbox.mails.length) {
    listEmails(result.inbox.mails, args)
  }
  process.exitCode = 0
  return
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
