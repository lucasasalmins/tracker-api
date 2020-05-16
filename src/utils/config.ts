// this object attempts to load app config from env variables,
// with hardcoded fallbacks if env vars aren't defined.

require('dotenv').config()

// const tablePrefix = process.env["DB_SCHEMA"] || 'idm'

const config = {
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env["JWT_SECRET"] || '',

  GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'] || '',
  GOOGLE_CLIENT_SECRET: process.env['GOOGLE_CLIENT_SECRET'] || '',
  GCLOUD_STORAGE_BUCKET: process.env['GCLOUD_STORAGE_BUCKET'] || '',
  GOOGLE_APPLICATION_CREDENTIALS: process.env['GOOGLE_APPLICATION_CREDENTIALS'] || '/dsol-proto-2d9519a11cb7.json',

  METADATA_MATCHER_USERNAME: process.env['METADATA_MATCHER_USERNAME'] || '',
  METADATA_MATCHER_PASSWORD: process.env['METADATA_MATCHER_PASSWORD'] || '',
  MATCHER_API_URL: process.env['MATCHER_API_URL'] || '',

  AUTO_TAGGER_API_URL: process.env['AUTO_TAGGER_API_URL'] || '',
  AUTO_TAGGER_USERNAME: process.env['AUTO_TAGGER_USERNAME'] || '',
  AUTO_TAGGER_PASSWORD: process.env['AUTO_TAGGER_PASSWORD'] || '',
  db: {
    USER: process.env["DB_USER"] || "lucassalmins",
    HOST: process.env["DB_HOST"] || "localhost",
    DATABASE: process.env["DB_NAME"] || "dev",
    PASSWORD: process.env["DB_PASSWORD"] || "",
    PORT: process.env["DB_PORT"] || 5432,
    SCHEMA: process.env["DB_SCHEMA"] || "tracker",
    DATABASE_URL: process.env["DATABASE_URL"] || ""
  }
}

export default config
