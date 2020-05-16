// this object attempts to load app config from env variables,
// with hardcoded fallbacks if env vars aren't defined.

require('dotenv').config()

const config = {
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env["JWT_SECRET"] || '',
  APP_NAME: process.env["APP_NAME"] || 'Tracker',

  GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'] || '',
  GOOGLE_CLIENT_SECRET: process.env['GOOGLE_CLIENT_SECRET'] || '',
  GCLOUD_STORAGE_BUCKET: process.env['GCLOUD_STORAGE_BUCKET'] || '',
  GOOGLE_APPLICATION_CREDENTIALS: process.env['GOOGLE_APPLICATION_CREDENTIALS'] || '/dsol-proto-2d9519a11cb7.json',
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
