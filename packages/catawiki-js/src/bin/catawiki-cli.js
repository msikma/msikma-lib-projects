#!/usr/bin/env node
// catawiki-js - Catawiki Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2019, Michiel Sikma. MIT license.

import makeArgParser from 'mlib-common/lib/argparse'
import { ensurePeriod } from 'mlib-common/lib/text'
import get from 'lodash/get'
import '@babel/polyfill'

const packageData = require('../../package.json')
const parser = makeArgParser({
  addHelp: true,
  description: ensurePeriod(packageData.description),
  epilog: `For more information, see <${packageData.homepage}>.`,
  longHelp: `This command line utility runs the desired action and prints the results
as JSON or XML.\n`,
  version: packageData.version
})

parser.addArgument(['--action'], { help: 'Which action to take.', choices: ['search'], _choicesHelp: ['Runs a search query and returns results.'], metavar: 'ACTION' })
parser.addArgument(['--output'], { help: 'Result output format.', choices: ['json', 'xml', 'terminal'], _choicesHelp: ['JSON string', 'XML string', 'Plain text readable in terminal (default)'], metavar: 'TYPE', defaultValue: 'terminal' })

// Search options:
parser.addSection('Search options:', '--query')
parser.addArgument(['--query'], { help: 'Query string to search for.' })
parser.addArgument(['--category'], { help: 'Set a specific category ID.', dest: 'catid', metavar: 'ID' })
parser.addArgument(['--country'], { help: 'Country code for a specific Catawiki instance.', dest: 'country', metavar: 'TLD' })

const parsed = parser.parseArgs()
const action = parsed.action
const args = {
  ...parsed,
  country: !!parsed.country ? parsed.country : get(process.env, 'DADA_CATAWIKI_TLD', 'com')
}

const searchOptions = ['query', 'catid']
const hasAnySearchOptions = searchOptions.map(o => args[o] != null).filter(o => o).length > 0
if ((action == null || action === 'search') && !hasAnySearchOptions) {
  parser.error(`Must pass search options (such as --query).`)
}

process.env.CATAWIKI_JS_CLI = '1'
require('../index').cli(args)
