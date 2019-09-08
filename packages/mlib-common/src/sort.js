// common - Utilities for msikma library projects <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { fromPairs, sortBy, toPairs } from 'lodash'

/** Sorts an object by keys. */
export const sortObjKeys = obj => (
  fromPairs(sortBy(toPairs(obj)))
)
