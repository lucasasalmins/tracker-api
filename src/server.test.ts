import { GraphQLServer } from 'graphql-yoga'
import * as DB from './db/initialiseDatabase'
import * as Server from './server'
import config from './utils/config'
import * as Logger from './utils/logger'
jest.mock('graphql-yoga')
// import { PrismaClient } from './prisma'
const { PORT } = config

const logConfigMock = jest.fn()
const loggerSpy = jest.spyOn(Logger.logger, 'info')
const logConfigSpy = jest.spyOn(Logger, 'logConfig')
const initDbMock = jest.spyOn(DB, 'initDb')

const options = {
  port: PORT,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const serverMock = jest.fn((options, callback) => {
  callback()
  console.log('server started')
})

const serverCallbackMock = jest.fn(() => {})
const serverCallbackSpy = jest.spyOn(Server, 'serverCallback')

// @ts-ignore
GraphQLServer.mockImplementation(() => ({
  start: serverMock,
}))

it('expect server to start', () => {
  Server.start()

  expect(serverMock).toHaveBeenCalled()
  expect(serverCallbackSpy).toHaveBeenCalled()
  // expect(initDbMock).toHaveBeenCalled()

  // expect(logConfigSpy).toHaveBeenCalledTimes(1)
  // expect(loggerSpy).toHaveBeenCalledTimes(3)
})
