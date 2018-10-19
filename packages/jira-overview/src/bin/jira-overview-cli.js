#!/usr/bin/env node
// jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import '@babel/polyfill'
import makeArgParser from 'mlib-common/lib/argparse'
import { ensurePeriod } from 'mlib-common/lib/text'

const packageData = require('../../package.json')
const parser = makeArgParser({
  addHelp: true,
  description: ensurePeriod(packageData.description),
  epilog: `For more information, see <${packageData.homepage}>.`,
  version: packageData.version
})

parser.addArgument(['--action'], { help: 'Which action to take.', choices: ['list'] })

const parsed = parser.parseArgs()
const action = parsed.action
const args = { ...parsed, action: action == null ? 'list' : action }

require('../index').cli(args)
