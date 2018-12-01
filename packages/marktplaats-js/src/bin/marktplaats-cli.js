#!/usr/bin/env node
// marktplaats-js - Marktplaats Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import makeArgParser from 'mlib-common/lib/argparse'
import { ensurePeriod } from 'mlib-common/lib/text'
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

parser.addArgument(['--action'], { help: 'Which action to take.', choices: ['search', 'detail'], _choicesHelp: ['Runs a search query and returns results.', 'Prints full details for a single item by ID.'], metavar: 'ACTION' })
parser.addArgument(['--list-cats'], { help: 'Prints a list of categories. Call with category ID to retrieve subcategories instead.', dest: 'id', defaultValue: 'none', nargs: '?' })
parser.addArgument(['--output'], { help: 'Result output format.', choices: ['json', 'xml', 'terminal'], _choicesHelp: ['JSON string', 'XML string', 'Plain text readable in terminal (default)'], metavar: 'TYPE', defaultValue: 'terminal' })

// Search options:
parser.addSection('Search options:', '--query')
parser.addArgument(['--query'], { help: 'Query string to search for.' })
parser.addArgument(['--category'], { help: 'Set a specific category ID.' })
//parser.addArgument(['--subcat'], { help: 'Set a specific subcategory ID.' })
parser.addArgument(['--seller'], { help: 'Restrict to a specific seller.' })
parser.addArgument(['--price-min'], { help: 'Set the min/max price for search results.', metavar: 'PRICE' })
parser.addArgument(['--price-max'], { help: '~', metavar: 'PRICE' })
parser.addArgument(['--item-status'], { help: 'Item status for search results.', choices: ['any', 'new', 'like-new', 'used'], defaultValue: 'any', metavar: 'STATUS' })
parser.addArgument(['--with-pictures'], { help: 'Includes pictures.', action: 'storeTrue', dest: 'withPictures' })

// Detail options:
parser.addSection('Detail options:', '--id')
parser.addArgument(['--id'], { help: 'ID of the item to retrieve details for.' })
parser.addArgument(['--slug'], { help: 'Slug of the item page (optional).' })
//parser.addArgument(['--category'], { help: 'Set a specific category ID.' })
//parser.addArgument(['--subcat'], { help: 'Set a specific subcategory ID.' })


const parsed = parser.parseArgs()
const action = parsed.action
const args = {
  ...parsed,
  action: parsed.id !== 'none' ? 'list-categories' : action == null ? 'search' : action
}

// Check if we have any valid search options at all. If we got none, then don't run a search unless '--action search' was specified.
// This is to prevent us from running a useless search for everything when the user just runs 'marktplaats-cli' without arguments.
const searchOptions = ['query', 'category', 'seller', 'price_min', 'price_max']
const hasAnySearchOptions = [...searchOptions.map(o => args[o] != null), args.item_status !== 'any'].filter(o => o).length > 0
if ((action == null || action == 'search') && !hasAnySearchOptions) {
  parser.error(`Must pass search options (such as --query).`)
}

// The cli() function is only for the command line. Make sure we remember we came from there.
process.env.MARKTPLAATS_JS_CLI = '1'
require('../index').cli(args)
