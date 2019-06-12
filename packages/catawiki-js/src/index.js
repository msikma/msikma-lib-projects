// catawiki-js - Catawiki Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import toDataString from 'mlib-common/lib/output'
import listingSearch from './scrape/search'

export const cli = async args => {
  if (process.env.CATAWIKI_JS_CLI !== '1') {
    throw new Error('Cannot use cli() except from the catawiki-cli command line utility')
  }

  try {
    if (args.action === 'search') {
      const result = await listingSearch({ query: args.query, categoryID: args.catid, countryCode: args.country })
      return outputAndExit(result, args)
    }
    else {
      console.error(`catawiki-cli: error: argument "--action": Invalid action (${args.action})`)
      process.exitCode = 1
    }
  }
  catch (err) {
    const stack = String(err.stack)
    console.error(`catawiki-cli: error: uncaught exception while running task:${stack ? `\n\n${stack}` : ` ${err.toString()}`}`)
    process.exitCode = 1
  }
}

// Output our results and exit the program.
const outputAndExit = (result, args) => {
  const output = toDataString(result, args.output)
  console.log(output)
  process.exitCode = 0
}

export { listingSearch }
