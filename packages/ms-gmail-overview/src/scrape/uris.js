// ms-gmail-overview - Simple Gmail scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { objToParams } from 'mlib-common/lib/query'

export const baseURL = 'https://mail.google.com'

// https://mail.google.com/mail/?ui=html&zy=h
export const gmailURL = () => (
  `${baseURL}/mail/?${objToParams({ ui: 'html', zy: 'h' })}`
)
