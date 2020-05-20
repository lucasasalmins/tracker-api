/**
 * pg-prmoise setup
 * adapted from https://github.com/vitaly-t/pg-promise/blob/master/examples/monitor.js
 */
import promise from 'bluebird' // or any other Promise/A+ compatible library
import { Pool, PoolConfig } from 'pg'
import * as monitor from 'pg-monitor'
import config from '../utils/config'

const dbConfig: PoolConfig = {
  user: config.db.USER,
  host: config.db.HOST,
  port: Number(config.db.PORT),
  database: config.db.DATABASE,
  password: config.db.PASSWORD,
  max: 25,
  idleTimeoutMillis: 30000,
}

// instantiate the PostgreSQL connection pool
const pool = new Pool(dbConfig)

const initOptions = {
  promiseLib: promise, // overriding the default (ES6 Promise)
  capSQL: true,
}

const pgp = require('pg-promise')(initOptions)

// attach to all query events
monitor.attach(initOptions)

// monitor.setTheme(myTheme); // selecting your own theme;
monitor.setTheme('invertedMonochrome') // change the default theme

monitor.setLog((msg, info) => {
  // save the screen messages into your own log file
})

// database instance
const db = pgp(dbConfig)

export { pool, db, pgp }

