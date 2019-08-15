// ms-jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

// Separator used to safely split the contents in terminal scripts.
const separator = '@%@'

/** Lists all scraped tickets. */
const listTickets = (result, args) => {
  for (const res of result) {
    listSingleTicket(res, args)
  }
}

/** Lists a single ticket. */
const listSingleTicket = (res, args) => {
  const values = Object.values(res).join(separator)
  console.log(values)
}

export default listTickets
