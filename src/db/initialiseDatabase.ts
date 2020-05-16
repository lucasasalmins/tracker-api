import { logger } from '../utils/logger'
import { db } from './index'
import * as Queries from './sql'


export const initDb = async () => {
  try {
    // TODO: create proper database migration steps
    // TODO: create DB IF NOT EXISTS https://stackoverflow.com/questions/18389124/simulate-create-database-if-not-exists-for-postgresql
    // await db.query(`DROP TABLE IF EXISTS "User" CASCADE`)

    // create tables
    await db.query(Queries.CREATE_SCHEMA)
    await db.query(Queries.CREATE_USER)
    await db.query(Queries.CREATE_ENTRY)
  } catch (error) {
    logger.error(error)
  }
}


