// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import toDataString from 'mlib-common/lib/output'
import listingDetail from './scrape/detail'
import listingSearch from './scrape/search'
import listCategories from './categories'

// Runs a single action from the command line, prints the result and then exits.
export const cli = async args => {
  // Don't run this unless we came from the command line.
  if (process.env.MARKTPLAATS_JS_CLI !== '1') {
    throw new Error('Cannot use cli() except from the marktplaats-cli command line utility')
  }

  try {
    if (args.action === 'list-categories') {
      const result = await listCategories(args.id)
      return outputAndExit(result, args)
    }
    else if (args.action === 'search') {
      const result = await listingSearch({ query: args.query, categoryID: args.catid })
      return outputAndExit(result, args)
    }
    else if (args.action === 'detail') {
      if (!args.url && !args.item_id) {
        console.error(`marktplaats-cli: error: for detail action, pass at least one of "--url" and "--id"`)
        process.exitCode = 1
        return
      }
      const result = await listingDetail({ url: args.url, id: args.item_id })
      return outputAndExit(result, args)
    }
    else {
      console.error(`marktplaats-cli: error: argument "--action": Invalid action (${args.action})`)
      process.exitCode = 1
    }
  }
  catch (err) {
    const stack = String(err.stack)
    console.error(`marktplaats-cli: error: uncaught exception while running task:${stack ? `\n\n${stack}` : ` ${err.toString()}`}`)
    process.exitCode = 1
  }
}

// Output our results and exit the program.
const outputAndExit = (result, args) => {
  const output = toDataString(result, args.output)
  console.log(output)
  process.exitCode = 0
}

export { listingDetail, listingSearch }
