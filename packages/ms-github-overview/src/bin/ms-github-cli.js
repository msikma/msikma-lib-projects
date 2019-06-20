#!/usr/bin/env node
// ms-github-overview - Simple Github info script <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import '@babel/polyfill'
import makeArgParser from 'mlib-common/lib/argparse'
import { expandTilde } from 'mlib-common/lib/file'
import { ensurePeriod } from 'mlib-common/lib/text'

const packageData = require('../../package.json')
const parser = makeArgParser({
  addHelp: true,
  description: ensurePeriod(packageData.description),
  epilog: `For more information, see <${packageData.homepage}>.`,
  version: packageData.version
})

parser.addArgument(['-q', '--quiet'], { help: 'Disables output printing (used to cache data).', action: 'storeTrue' })
parser.addArgument(['--action'], { help: 'Which action to take.', choices: ['notes'] })
parser.addArgument(['--output'], { help: 'Result output format.', choices: ['json', 'xml', 'terminal'], _choicesHelp: ['JSON string', 'XML string', 'Plain text readable in terminal (default)'], metavar: 'TYPE', defaultValue: 'terminal' })
parser.addArgument(['--cache-only'], { help: 'Refreshes cache without printing output.', action: 'storeTrue', dest: 'cacheOnly' })
parser.addArgument(['--no-cache'], { help: 'Forces a cache-less request.', action: 'storeTrue', dest: 'noCache' })
parser.addArgument(['--cache-loc'], { help: 'Location of the cached data.', defaultValue: '~/.cache/ms-github-js', metavar: 'CL' })
parser.addArgument(['--cache-time'], { help: 'Duration that the cache is considered valid, in minutes. By default: 300 (5 hours).', defaultValue: 300, metavar: 'MIN', dest: 'cacheTime' })

const parsed = parser.parseArgs()
const action = parsed.action
const args = {
  ...parsed,
  cacheLoc: expandTilde(parsed.cache_loc),
  action: action == null ? 'notes' : action
}

require('../index').cli(args)
