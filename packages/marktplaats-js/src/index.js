// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import request from 'mlib-common/lib/request'

// Runs a single action from the command line, prints the result and then exits.
export const cli = async args => {
  // Don't run this unless we came from the command line.
  if (process.env.MARKTPLAATS_JS_CLI !== '1') {
    throw new Error('Cannot use cli() except from the marktplaats-cli command line utility')
  }

  if (args.action === 'search') {
    console.error('marktplaats-cli: error: not implemented yet')
    process.exit(1)
  }
  else if (args.action === 'detail') {
    console.error('marktplaats-cli: error: not implemented yet')
    process.exit(1)
  }
  else {
    console.error(`marktplaats-cli: error: argument "--action": Invalid action (${args.action})`)
    process.exit(1)
  }
}
