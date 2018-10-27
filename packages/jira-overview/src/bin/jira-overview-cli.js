#!/usr/bin/env node
// jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import '@babel/polyfill'
import { ensurePeriod } from 'mlib-common/lib/text'
import { expandTilde } from 'mlib-common/lib/file'
import makeArgParser from 'mlib-common/lib/argparse'
import { parse } from 'upath';

const packageData = require('../../package.json')
const parser = makeArgParser({
  addHelp: true,
  description: ensurePeriod(packageData.description),
  epilog: `For more information, see <${packageData.homepage}>.`,
  version: packageData.version
})

parser.addArgument(['--action'], { help: 'Which action to take.', choices: ['list'] })
parser.addArgument(['--output'], { help: 'Result output format.', choices: ['json', 'xml', 'terminal'], _choicesHelp: ['JSON string', 'XML string', 'Plain text readable in terminal (default)'], metavar: 'TYPE', defaultValue: 'terminal' })
parser.addArgument(['--no-cache'], { help: 'Forces a cache-less request.', action: 'storeTrue' })
parser.addArgument(['--cookie-loc'], { help: 'Location of the cookie authentication file.', defaultValue: '~/.config/jirajs/cookies.txt', metavar: 'CKL' })
parser.addArgument(['--cache-loc'], { help: 'Location of the tasks cache.', defaultValue: '~/.cache/jirajs/tasks-cache.json', metavar: 'CL' })
parser.addArgument(['--cache-time'], { help: 'Duration that the cache is considered valid, in minutes. By default: 300 (5 hours).', defaultValue: 300, metavar: 'MIN' })

const parsed = parser.parseArgs()
const action = parsed.action
const args = {
  ...parsed,
  action: action == null ? 'list' : action,
  cookie_loc: expandTilde(parsed.cookie_loc),
  cache_loc: expandTilde(parsed.cache_loc)
}

require('../index').cli(args)
