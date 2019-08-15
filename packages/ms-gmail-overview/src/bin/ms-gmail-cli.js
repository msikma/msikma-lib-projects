#!/usr/bin/env node
// ms-gmail-overview - Simple Gmail scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import '@babel/polyfill'
import makeArgParser from 'mlib-common/lib/argparse'
import { expandTilde } from 'mlib-common/lib/file'
import { ensurePeriod } from 'mlib-common/lib/text'

const packageData = require('../../package.json')
const parser = makeArgParser({
  addHelp: true,
  description: ensurePeriod(packageData.description),
  epilog: `For more information, see <${packageData.homepage}>.`,
  version: packageData.version,
  longHelp: `This script uses an SQLite database to keep track of which items have
already been shown. The 'data' action always returns all items, but 'list'
only returns new items by default: items we haven't cached yet, and items
that are set to 'read' remotely.
`
})

parser.addArgument(['-q', '--quiet'], { help: 'Disables output printing (used to cache data).', action: 'storeTrue' })
parser.addArgument(['--action'], { help: 'Which action to take.', choices: ['data', 'list'] })
parser.addArgument(['--output'], { help: 'Result output format (for \'data\' action).', choices: ['json', 'xml', 'terminal'], _choicesHelp: ['JSON string', 'XML string', 'Plain text readable in terminal (default)'], metavar: 'TYPE', defaultValue: 'terminal' })
parser.addArgument(['--include-read'], { help: 'Includes read emails when using the \'list\' action.', action: 'storeTrue' })
parser.addArgument(['--cache-only'], { help: 'Refreshes cache without printing output.', action: 'storeTrue' })
parser.addArgument(['--no-cache'], { help: 'Forces a cache-less request (still saves to cache).', action: 'storeTrue' })
parser.addArgument(['--db-loc'], { help: 'Location of the SQLite database for storing cache.', defaultValue: '~/.cache/ms-gmail-js/id-database.sqlite3', metavar: 'DBL' })
parser.addArgument(['--cookie-loc'], { help: 'Location of the cookie authentication file.', defaultValue: '~/.config/ms-gmail-js/cookies.txt', metavar: 'CKL' })
parser.addArgument(['--cache-loc'], { help: 'Location of the cached data.', defaultValue: '~/.cache/ms-gmail-js/gmail-cache.json', metavar: 'CL' })
parser.addArgument(['--cache-time'], { help: 'Duration that the cache is considered valid, in minutes. By default: 5.', defaultValue: 5, metavar: 'MIN' })

const parsed = parser.parseArgs()
const action = parsed.action
const args = {
  ...parsed,
  db_loc: expandTilde(parsed.db_loc),
  cookie_loc: expandTilde(parsed.cookie_loc),
  cache_loc: expandTilde(parsed.cache_loc),
  action: action == null ? 'list' : action
}

require('../index').cli(args)
