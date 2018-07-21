#!/usr/bin/env node
/**
 * buyee-js - Buyee Client Library <https://github.com/msikma/web-scrapers>
 * Copyright © 2018, Michiel Sikma. MIT license.
 *
 * Command line interface entry point. Note: this file is not transpiled
 * and must not contain syntax that Node cannot natively run.
 */
const fs = require('fs')
const ArgumentParser = require('argparse').ArgumentParser
const addLongHelp = require('argparse-longhelp')
const packageData = require('../../package.json')

const epilog = `For more information, see <https://github.com/msikma/buyee-js>.${
  process.env.BUYEE_JS_USE_SRC ? '\nRunning in development mode (BUYEE_JS_USE_SRC=1).' : ''
}`
const longHelp = `Command line utility for the Buyee client library. Can be used in place
of the library in case your project doesn't run on Node. This utility
runs the desired action and prints the results as JSON data.
`

const parser = new ArgumentParser({
  version: packageData.version,
  addHelp: true,
  description: packageData.description,
  epilog
})
addLongHelp(parser, longHelp)

// We're gonna do some more magic. Add a search arguments header above the first relevant argument.
const regularFormatHelp = parser.formatHelp
parser.formatHelp = () => {
  // Run the original formatting function, then find the 'query' argument.
  // Add a header string in front of it.
  const buffer = regularFormatHelp()
    .split('\n')
    .map(line => line.startsWith('  --query QUERY')
      ? `\nSearch options:\n${line}`
      : line)

  // While we're at it, remove double empty lines.
  return buffer.map(l => l.trim() === '' ? '' : l).join('\n').split('\n\n\n').join('\n\n')
}

parser.addArgument(['--action'], { help: 'Which action to take.', choices: ['search'], defaultValue: 'search' })
parser.addArgument(['--output'], { help: 'Result output format.', choices: ['json'], defaultValue: 'json' })

// Search options:
parser.addArgument(['--query'], { help: 'Query string to search for.' })
parser.addArgument(['--category'], { help: 'Set a specific category ID.' })
parser.addArgument(['--seller'], { help: 'Restrict to a specific seller.' })
parser.addArgument(['--price-min'], { help: 'Set the min/max price for search results.', metavar: 'PRICE' })
parser.addArgument(['--price-max'], { help: '~', metavar: 'PRICE' })
parser.addArgument(['--buyout-min'], { help: 'Set the min/max buyout price for search results.', metavar: 'PRICE' })
parser.addArgument(['--buyout-max'], { help: '~', metavar: 'PRICE' })
parser.addArgument(['--item-status'], { help: 'Item status for search results.', choices: ['any', 'new', 'used'], defaultValue: 'any', metavar: 'STATUS' })
parser.addArgument(['--store-type'], { help: 'Store type (commercial store or individual seller).', choices: ['any', 'store', 'individual'], defaultValue: 'any', metavar: 'TYPE' })
parser.addArgument(['--with-buyout'], { help: 'Buyout price set.', action: 'storeTrue', dest: 'withBuyout' })
parser.addArgument(['--newly-listed'], { help: 'Recently listed.', action: 'storeTrue', dest: 'newlyListed' })
parser.addArgument(['--free-delivery'], { help: 'Free delivery inside Japan.', action: 'storeTrue', dest: 'freeDeliveryInJapan' })
parser.addArgument(['--with-pictures'], { help: 'Includes pictures.', action: 'storeTrue', dest: 'withPictures' })
parser.addArgument(['--recommended'], { help: 'Buyee recommended.', action: 'storeTrue', dest: 'buyeeRecommended' })

// Reminder: 'quiet' is 0, 1 or 2.
const parsed = parser.parseArgs()
const args = {
  ...parsed,
  // Note: modify 'store_type' because the API expects 'individualSeller', but that's long to type.
  store_type: parsed.store_type === 'individual' ? 'individualSeller' : parsed.store_type
}

// The cli() function is only for the command line. Make sure we remember we came from there.
process.env.BUYEE_JS_CLI = '1'

require('babel-polyfill')

// If we're transpiling on the fly, configure Babel.
if (process.env.WEB_SCRAPERS_USE_SRC === '1') {
  const babelConfig = JSON.parse(fs.readFileSync(`${__dirname}/../../../../.babelrc`, 'utf8'))
  require('babel-register')(babelConfig)
}

require('../index').cli(args)
