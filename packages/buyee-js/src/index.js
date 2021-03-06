// buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

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
    if (args.site === 'yajp') {
      // Yahoo! Auction Japan
      const cliAuction = new YahooAuction()
      const results = await cliAuction.search(cliToAPIArgs(args))
      outputData(results, args.output)
    }
    else {
      console.error('buyee-cli: error: argument "--site": Invalid or unimplemented site')
      process.exitCode = 1
      return
    }
    process.exitCode = 0
    return
  }
  else {
    console.error('buyee-cli: error: argument "--action": Invalid action')
    process.exitCode = 1
    return
  }
}
