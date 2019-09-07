// ms-jira-overview - Simple Jira dash scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

/**
 * Simplifies the status so it's easier to do text matches against it.
 * A regular status is e.g. 'In Progress', which we'll turn into 'in_progress'.
 */
export const simplifyStatus = (status) => {
  return status.toLowerCase().trim().replace(' ', '_')
}
