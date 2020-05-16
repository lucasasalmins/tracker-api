import { GraphQLServer } from 'graphql-yoga'
import * as DB from './db/initialiseDatabase'
import { PrismaClient } from './prisma'
import { schema } from './schema'
import { getUser, permissions } from './schema/user/auth'
import config from './utils/config'
import { logConfig, logger } from './utils/logger'

const prisma = new PrismaClient({ log: ['warn', 'query', 'info'] })

export interface Context {
  prisma: PrismaClient
}

export function createContext(): Context {
  return { prisma }
}

export const serverCallback = async ({ port, endpoint, playground }) => {
  logConfig()
  await DB.initDb()
  logger.info(`💾  Database initialised and connected`)
  logger.info(`🚀  Server ready at http://localhost:${port}${endpoint}`)
  logger.info(`☸️   Playground ready at http://localhost:${port}${playground}`)
}

export const start = () => {
  const { PORT } = config

  const server = new GraphQLServer({
    schema,
    // https://www.prisma.io/tutorials/graphql-rest-authentication-authorization-basics-ct20/#using-graphql-shield
    middlewares: [permissions],
    context: async (ctx) => ({
      ...ctx,
      ...createContext(),
      user: await getUser({
        ...ctx,
        ...createContext(),
      }),
    }),
  })

  const options = {
    port: PORT,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
  }

  // https://github.com/prisma-labs/graphql-yoga#api
  server.start(options, serverCallback)
}
start()
