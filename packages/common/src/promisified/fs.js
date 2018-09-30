// buyee-js - Buyee Client Library <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import Promise from 'bluebird'

module.exports = {
  ...Promise.promisifyAll(require('fs'))
}
