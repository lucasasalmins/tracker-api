import { makeSchema } from '@nexus/schema'
import * as Generic from './types'
import * as User from './user'

export const schema = makeSchema({
  types: [
    Generic,
    User
  ],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/typings.ts',
  },
})
