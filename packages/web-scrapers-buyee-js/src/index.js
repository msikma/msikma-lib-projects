/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

import { cliToAPIArgs, outputData } from './util/cli'
import YahooAuction from './yahoo-auction'

/**
 * Runs a single action from the command line, prints the result and then exits.
 */
export const cli = async args => {
  // Don't run this unless we came from the command line.
  if (process.env.BUYEE_JS_CLI !== '1') {
    throw new Error('Cannot use cli() except from the buyee-cli command line utility')
  }

  if (args.action === 'search') {
    const cliAuction = new YahooAuction()
    const results = await cliAuction.search(cliToAPIArgs(args))
    outputData(results, args.output)
    process.exit(0)
  }
  else {
    console.error('buyee-cli: error: argument "--action": Invalid action')
    process.exit(1)
  }
}
