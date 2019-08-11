// ms-gmail-overview - Simple Gmail scraper <https://github.com/msikma/msikma-lib-projects>
// Copyright © 2018, Michiel Sikma. MIT license.

import sqlite from 'sqlite'
import { isArray } from 'lodash'

// SQLite 3 database containing a list of IDs that have already been read.
let db

/**
 * Opens the database file and checks whether we need to bootstrap our required tables.
 */
export const dbInit = async (dbLocation) => {
  db = await sqlite.open(dbLocation)

  // If we don't have the 'cached_ids' table, assume that this is a new database file.
  if (!await hasTable('cached_ids')) {
    await createTables();
  }
}

/** Checks whether a table exists. Resolves with true/false. */
const hasTable = async ($name) => (
  !!await db.get(`select * from sqlite_master where type='table' and name=$name`, { $name })
)

/** Creates all necessary tables. */
const createTables = async () => {
  await db.run(`
    create table cached_ids (
      id varchar(127),
      added datetime default current_timestamp,
      primary key (id)
    )
  `)
}

/** Returns a list of which IDs, from a given array, have been cached in the database. */
const filterCachedIDs = async (mails) => {
  if (!mails.length) return

  // Ensure our ids are in an array.
  const mailsArr = !isArray(mails) ? [mails] : mails
  const ids = mailsArr.map(m => m.id)
  const sql = (`
    select id, added
    from cached_ids
    where id in (${new Array(ids.length).fill('?').join(', ')})
  `)
  const stmt = await db.prepare(sql)
  const cachedIDs = await stmt.all([...ids])
  const cachedIDsLT = cachedIDs.reduce((acc, mail) => ({ ...acc, [mail.id]: true }), {})
  return cachedIDsLT
}

/**
 * Takes a list of IDs, checks which ones we've already cached in our database,
 * and returns a list of new IDs that we haven't reported on yet.
 *
 * Normally, you would scrape a page full of items, then run the results through
 * this function, and finally display only the ones we return from here.
 */
export const removeCached = async (mails) => {
  if (mails.length === 0) return []

  // Make a lookup table for mails.
  const mailLT = mails.reduce((acc, mail) => ({ ...acc, [mail.id]: mail }), {})
  // Returns all the IDs from this batch of mails that are already in the database.
  const resultsLT = await filterCachedIDs(mails)

  // Now make a list of all new mails that have not been cached yet.
  let newMails = []
  for (const [id, mail] of Object.entries(mailLT)) {
    if (resultsLT[id] === true) continue
    newMails.push(mail)
  }

  return newMails
}

/** Saves IDs into our database. */
export const cacheItems = async (ids) => {
  if (ids.length === 0) return

  const stmt = await db.prepare(`insert into cached_ids values (?, CURRENT_TIMESTAMP)`)

  // If we try to cache something that's already cached, we should always be notified in the log.
  try {
    await Promise.all(ids.map(id => new Promise(async (resolve, reject) => {
      // Warn if a single ID insertion goes wrong.
      try {
        await stmt.run(id)
        resolve()
      }
      catch (err) {
        console.error(`${err} id: ${id}, time: ${(+new Date())}`)
        reject({ id })
      }
    })))
  }
  catch (err) {
    // Warn if any of the IDs could not be inserted.
    console.warn(`cacheItems: caching did not complete: ID was already found: ${err.id}`)
  }

  stmt.finalize()
  return stmt;
}
