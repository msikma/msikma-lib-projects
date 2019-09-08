#!/usr/bin/env node
// ms-jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import '@babel/polyfill'
import { ensurePeriod } from 'mlib-common/lib/text'
import { expandTilde } from 'mlib-common/lib/file'
import makeArgParser from 'mlib-common/lib/argparse'

const packageData = require('../../package.json')
const parser = makeArgParser({
  addHelp: true,
  description: ensurePeriod(packageData.description),
  epilog: `For more information, see <${packageData.homepage}>.`,
  version: packageData.version
})

parser.addArgument(['-q', '--quiet'], { help: 'Disables output printing (used to cache data).', action: 'storeTrue' })
parser.addArgument(['--action'], { help: 'Which action to take.', choices: ['data'] })
parser.addArgument(['--username'], { help: 'Whose information to display.' })
parser.addArgument(['--output'], { help: 'Result output format.', choices: ['json', 'xml', 'terminal'], _choicesHelp: ['JSON string', 'XML string', 'Plain text readable in terminal (default)'], metavar: 'TYPE', defaultValue: 'terminal' })
parser.addArgument(['--no-cache'], { help: 'Forces a cache-less request (still saves to cache).', action: 'storeTrue' })
parser.addArgument(['--cache-loc'], { help: 'Location of the cache.', defaultValue: '~/.cache/github-contribs-js/cache.json', metavar: 'CL' })
parser.addArgument(['--cache-time'], { help: 'Duration that the cache is considered valid, in minutes. By default: 300 (5 hours).', defaultValue: 300, metavar: 'MIN' })

const parsed = parser.parseArgs()
const action = parsed.action
const args = {
  ...parsed,
  action: action == null ? 'list' : action,
  cache_loc: expandTilde(parsed.cache_loc)
}

require('../index').cli(args)
