// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

const ArgumentParser = require('argparse').ArgumentParser
const addLongHelp = require('argparse-longhelp')

// A simple wrapper for the ArgumentParser library. Adds support for an extra help paragraph,
// and the ability to add multiple sections. This is useful for grouping certain options together.
// Original library: <https://github.com/nodeca/argparse>
const makeArgParser = (opts) => {
  return new class ArgumentParserWrapper {
    constructor() {
      // List of extra multiple choice items we'll print.
      this.choices = []
      // List of section headers we'll print.
      this.sections = []

      this.parser = new ArgumentParser(opts)
      if (opts.longHelp) addLongHelp(this.parser, opts.longHelp)
    }

    // Wrapper for ArgumentParser.addArgument().
    addArgument = (...opts) => {
      // Special formatting case: if an argument has 'choices', 'metavar' and
      // our own '_choicesHelp', we want to display its options differently than normal.
      // Save a reference and modify the output before parsing.
      if (opts[1].choices && opts[1].metavar && opts[1]._choicesHelp) {
        this.choices.push({ name: opts[0], choices: opts[1].choices, choicesHelp: opts[1]._choicesHelp })
      }
      return this.parser.addArgument(...opts)
    }

    // Wrapper for ArgumentParser.error().
    error = (...opts) => this.parser.error(...opts)

    // Adds any option sections we have and then runs the parser.
    parseArgs = (...opts) => {
      this._formatHelp()
      return this.parser.parseArgs(...opts)
    }

    // Adds a new section to the list of arguments, right before  whatever was passed as 'firstTag'.
    // E.g. addSection('Search options:', '--query') will add a search options right before the --query tag.
    addSection(header, firstTag) {
      this.sections.push({ header, firstTag })
    }

    // Replaces ArgumentParser's usual help formatter with one that supports multiple sections.
    // Also cleans up the output a bit.
    _formatHelp = () => {
      const originalFormatHelp = this.parser.formatHelp;
      this.parser.formatHelp = () => {
        // Run the original formatting function, then find the 'query' argument.
        // Add a header string in front of it.
        let buffer = originalFormatHelp().split('\n')
        this.sections.forEach(section => {
          buffer = buffer.map(line => (
            line.trim().startsWith(section.firstTag) ? `\n${section.header}\n${line}` : line
          ))
        })

        // Format the extra multiple choice sections.
        this.choices.forEach(choiceItem => {
          let choiceSection = []
          const choices = choiceItem.choices.length
          for (let a = 0; a < choices; ++a) {
            choiceSection.push(`     ${a === 0 ? '{' : ' ' }${`${choiceItem.choices[a]}${a < choices - 1 ? ',' : '}'}`.padEnd(18)}${choiceItem.choicesHelp[a] ? choiceItem.choicesHelp[a] : ''}`)
          }
          buffer = buffer.map(line => (
            line.trim().startsWith(this._getArgStr(choiceItem.name)) ? `${line}\n${choiceSection.join('\n')}` : line
          ))
        })

        // While we're at it, remove double empty lines.
        return this._removeDoubleEmptyLines(buffer)
      }
    }

    // Returns a string with the given argument, e.g. '-h, --help'.
    _getArgStr = (arg) => (
      arg.length === 1
        ? `${arg[0]}`
        : `${arg[0]}, ${arg[1]}`
    )

    // Removes double empty lines that sometimes show up.
    _removeDoubleEmptyLines = (str) => (
      str.map(l => l.trim() === '' ? '' : l).join('\n').split('\n\n\n').join('\n\n')
    )
  }
}

export default makeArgParser
