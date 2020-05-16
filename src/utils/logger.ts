import morgan from 'morgan';
import { createLogger, format, Logger, transports } from "winston";
import config from './config';

// define winston logger configuration
const loggerConfig = {
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf((info: any): string => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()]
}


// construct the winston logger from the generated config
const logger = createLogger(loggerConfig);

// define the morgan requests logger, on top of the winston logger
const morganLogger = morgan("combined", {
  stream: { write: (message: string): Logger => logger.info(message) }
});

const logConfig = () => (
  logger.info(`iDM Portal app config loaded: ${JSON.stringify({
    ...config.db, 
    ...config,
    DATABASE_URL: '*****',
    PASSWORD: '*****',
    JWT_SECRET: '*****',
    GOOGLE_CLIENT_SECRET: '*****',
    METADATA_MATCHER_PASSWORD: '*****',
    AUTO_TAGGER_PASSWORD: '*****',

  }, null, 2)}`)
)

export { logger, morganLogger, Logger, logConfig };

