// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { ArgumentParser } from 'argparse'
import HelpFormatter from 'argparse/lib/help/formatter'

import { removeUnnecessaryLines } from './text'

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
      // Used to keep track of sections and add them after the argument following them.
      this.sectionReady = false
      this.sectionNext = null

      this.parser = new ArgumentParser(opts)
      this._addLongHelp(opts.longHelp)
    }

    // Wrapper for ArgumentParser.addArgument().
    addArgument = (...opts) => {
      // Add a section if we've set one up to be printed.
      if (this.sectionReady) {
        // We'll save the longest argument to do string matching on.
        this.sections.push({ header: this.sectionNext, match: this.longestArgument(opts[0]) })
        this.sectionReady = false
      }
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

    // Adds a new section to the list of arguments, right before whatever argument comes next.
    addSection(header) {
      this.sectionReady = true
      this.sectionNext = header
    }

    // Adds extra help lines to the output if needed, and sets up a modified help formatter.
    _addLongHelp = (longHelp, removeLines = true) => {
      this.parser.formatHelp = () => {
        // Here we do some messing around with the private ArgumentParser API in order to
        // get extra text to show up. You're never supposed to do that, but oh well.
        const formatter = new HelpFormatter({ prog: this.parser.prog })
        formatter.addUsage(this.parser.usage, this.parser._actions, this.parser._mutuallyExclusiveGroups)
        formatter.addText(this.parser.description)
        if (longHelp) {
          // Add the long help text without filtering the text formatting.
          formatter._addItem(str => str, [longHelp])
        }
        this.parser._actionGroups.forEach((actionGroup) => {
          formatter.startSection(actionGroup.title)
          formatter.addText(actionGroup.description)
          formatter.addArguments(actionGroup._groupActions)
          formatter.endSection()
        });
        // Add epilogue without reformatting the whitespace.
        // Don't you DARE take away my linebreaks.
        formatter._addItem(str => str, [this.parser.epilog])
        const formatted = formatter.formatHelp()
        return removeLines ? removeUnnecessaryLines(formatted) : formatted
      }
    }

    hasArgument = (arg, line) => {
      return new RegExp(`[^\[]${arg}([^\s]|$)`).test(line)
    }

    longestArgument = (args) => {
      return args.reduce((l, o) => (o.length > l.length ? o : l), '')
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
          buffer = buffer.map(line => {
            // Find the first argument that this section should be directly above.
            return this.hasArgument(section.match, line) ? `\n${section.header}\n${line}` : line
          })
        })

        // Format the extra multiple choice sections.
        this.choices.forEach(choiceItem => {
          let choiceSection = []
          const choices = choiceItem.choices.length
          for (let a = 0; a < choices; ++a) {
            choiceSection.push(`     ${a === 0 ? '{' : ' ' }${`${choiceItem.choices[a]}${a < choices - 1 ? ',' : '}'}`.padEnd(18)}${choiceItem.choicesHelp[a] ? choiceItem.choicesHelp[a] : ''}`)
          }
          buffer = buffer.map(line => {
            return this.hasArgument(this.longestArgument(choiceItem.name), line) ? `${line}\n${choiceSection.join('\n')}` : line
          })
        })

        // While we're at it, remove double empty lines.
        return this._removeDoubleEmptyLines(buffer)
      }
    }

    // Removes double empty lines that sometimes show up.
    _removeDoubleEmptyLines = (str) => (
      str.map(l => l.trim() === '' ? '' : l).join('\n').split('\n\n\n').join('\n\n')
    )
  }
}

export default makeArgParser
