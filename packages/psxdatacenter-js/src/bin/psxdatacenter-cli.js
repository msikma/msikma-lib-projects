#!/usr/bin/env node
// psxdatacenter-js - Playstation DataCenter Client Library <https://github.com/msikma/msikma-lib-projects>
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

parser.addArgument(['id'], { help: 'ID of a PSX/PS2/PSP disc.', dest: 'id' })
parser.addArgument(['--output'], { help: 'Result output format.', choices: ['json', 'xml', 'terminal'], _choicesHelp: ['JSON string', 'XML string', 'Plain text readable in terminal (default)'], metavar: 'TYPE', defaultValue: 'terminal' })

const parsed = parser.parseArgs()
const args = { ...parsed }

process.env.PSXDATACENTER_JS_CLI = '1'
require('../index').cli(args)
