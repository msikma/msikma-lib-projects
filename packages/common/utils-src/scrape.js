/**
 * common - Utilities for web scraper projects <https://github.com/msikma/msikma-lib-projects>
 * Copyright © 2018, Michiel Sikma. MIT license.
 */

import cheerio from 'cheerio'

/** Runs an HTML string through Cheerio and returns its object. */
const parse = (html) => (
  cheerio.load(html)
)

export default parse
