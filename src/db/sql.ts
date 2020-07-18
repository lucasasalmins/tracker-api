import config from '../utils/config'



export const CREATE_SCHEMA = `
  CREATE SCHEMA IF NOT EXISTS ${config.db.SCHEMA}
`

export const CREATE_USER = `
  CREATE TABLE IF NOT EXISTS ${config.db.SCHEMA}."User" (
    id                  SERIAL PRIMARY KEY,
    google_id           character varying(255) NOT NULL,

    first_name          character varying(255),
    last_name           character varying(255),
    role                character varying(255) NOT NULL,

    email               character varying(255) UNIQUE NOT NULL,
    password            character varying(255) NOT NULL,
    
    google_image_url    character varying(255),

    created_at          timestamp with time zone NOT NULL,
    updated_at          timestamp with time zone NOT NULL
  )
`

export const CREATE_ENTRY = `
  CREATE TABLE IF NOT EXISTS ${config.db.SCHEMA}."Entry" (
    id                  SERIAL PRIMARY KEY,
    item                character varying(255) NOT NULL,
    value               character varying(255) NOT NULL,
    occurred            timestamp with time zone NOT NULL,
    created_at          timestamp with time zone NOT NULL,
    updated_at          timestamp with time zone NOT NULL,
    user_id             integer REFERENCES ${config.db.SCHEMA}."User"(id) NOT NULL
  )
`
export const fetchUniqueItems = (userId: number) => `
  SELECT
    item,
    COUNT(item) AS freq
  FROM
    tracker."Entry"
  WHERE
    user_id = ${userId}
  GROUP BY
    item
  ORDER BY
    freq DESC,
    item
`

export const fetchUniqueDays = (userId: number) => `
    SELECT
      occurred
    FROM
      tracker."Entry"
    WHERE
      user_id = ${userId}
    ORDER BY
      occurred
`