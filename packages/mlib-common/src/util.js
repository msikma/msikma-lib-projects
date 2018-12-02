// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

// Expose array-flatten: https://www.npmjs.com/package/array-flatten
export { default as flatten } from 'array-flatten'

// Trims a specific character from a string like trim() does with whitespace.
// Taken from Stack Overflow and modified slightly:
// <https://stackoverflow.com/a/32516190>
export const charTrim = (str, replChar = '') => {
  let oldChar = replChar
  if (oldChar === "]") oldChar = "\\]";
  if (oldChar === "\\") oldChar = "\\\\";
  return str.replace(new RegExp(`^["${oldChar}"]+|["${oldChar}"]+$`, 'g'), '');
}
