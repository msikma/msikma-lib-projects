// msikma-lib-projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

// Small script to generate a Markdown list of the packages currently in the project.
const { readdirSync, lstatSync } = require('fs')
const { join } = require('path')

// Helpfully provided by @nick-mccurdy <https://stackoverflow.com/a/24594123>
const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory)

// Check every dir under packages/ to see if it's a library project.
const pkgInfo = getDirectories(`${__dirname}/../packages`).reduce((acc, pkg) => {
  const { name, _targetWebsite, _shortDescription } = require(`${pkg}/package.json`)
  // If there's no _targetWebsite in the package.json, it's common code
  // and shouldn't be listed.
  if (!_targetWebsite) return acc
  return [...acc, { name, website: _targetWebsite, desc: _shortDescription }]
}, [])

// Output as Markdown table.
let output = [
  '| Name | Description | Site |',
  '|:-----|:------------|:-----|',
  ...(pkgInfo.map(info => `| \`${info.name}\` | ${info.desc} | [${info.website}](${info.website}) |`))
]

console.log(output.join('\n'))