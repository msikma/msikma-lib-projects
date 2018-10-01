// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

/**
 * Removes extra empty lines by trimming every line, then removing the empty strings.
 * If 'leaveGap' is true, we will instead compress multiple empty lines down to a single empty line.
 */
export const removeEmptyLines = (str, leaveGap = false) => {
  if (leaveGap) {
    const split = str.split('\n').map(l => l.trim())
    const lines = split.reduce((acc, curr) => [...acc, ...(curr === acc[acc.length - 1] ? [] : [curr])], [])
    return lines.join('\n')
  }
  else {
    return str.split('\n').map(l => l.trim()).filter(l => l !== '').join('\n')
  }
}

/** List of block elements. (Non-exhaustive, but it works well enough for most cases.) */
const blockEls = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'pre', 'address', 'blockquote', 'dl', 'div', 'fieldset', 'form', 'noscript', 'table']

/** Converts block elements to linebreaks. Useful for cleaning up HTML before converting to plain text. */
export const blockElsToLb = ($text) => {
  for (let el of blockEls) {
    $text.find(el).before('\n')
  }
  $text.find('br').replaceWith('\n')
  $text.find('hr').replaceWith('\n')
}

// Ensures that a string ends with a period.
export const ensurePeriod = (str) => {
  if (str.slice(-1) === '.') return str
  return `${str}.`
}
