// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { isArray } from 'lodash'

/**
 * Converts an object of key/value pairs to URI parameters without leading question mark.
 * By default, we remove: null, empty strings and empty arrays.
 */
export const objToParams = (obj, {
  removeNull = true,
  removeEmptyString = true,
  removeEmptyArray = true,
  removeFalse = false
} = {}) => Object.keys(obj)
  // Filter out everything that needs to be filtered out.
  .filter(k =>
    (!removeNull || (removeNull && obj[k] != null)) &&
    (!removeEmptyString || (removeEmptyString && obj[k] !== '')) &&
    (!removeFalse || (removeFalse && obj[k] !== false)) &&
    (!removeEmptyArray || (removeEmptyArray && (!isArray(obj[k]) || obj[k].length > 0))))
  // Encode to URI components. Account for the zero-width array.
  .map(k => isArray(obj[k]) && obj[k].length > 0
    ? obj[k].map(i => `${encodeURIComponent(k)}[]=${encodeURIComponent(i)}`).join('&')
    : `${encodeURIComponent(k)}${isArray(obj[k]) ? '[]' : ''}=${encodeURIComponent(obj[k])}`)
  .join('&')

/**
 * Converts the spaces in a URI parameter string to the '+' character.
 * Only for use in application/x-www-form-urlencoded.
 * Run this on URI encoded strings - e.g. toFormURIComponent(encodeURIComponent(query)).
 */
export const toFormURIComponent = paramStr =>
  paramStr.replace(/%20/g, '+')
