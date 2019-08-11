// ms-gmail-overview - Simple Gmail scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import { removeCached, cacheItems } from './cache'

// Separator used to easily split the contents.
const separator = '@%@'

/** Simple email output for consumption by shell scripts. */
const listEmails = async (mails) => {
  const newMails = await removeCached(mails)
  for (const { timestamp, sender, link, preview, subject, id } of newMails) {
    console.log([id, timestamp, sender, subject, preview, link].join(separator))
  }
  await cacheItems(newMails.map(m => m.id))
}

export default listEmails
