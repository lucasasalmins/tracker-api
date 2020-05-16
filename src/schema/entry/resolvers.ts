import { extendType } from '@nexus/schema'
import { logger } from '../../utils/logger'
import { Entry } from './types'


export const entryResolver = async (_, args, ctx) => {
  try {
    const entries = await ctx.prisma.entry.findMany()
    console.log(entries)
    return entries
  } catch (error) {
    logger.error(error)
    return error
  }
}

export const users = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('entries', {
      type: Entry,
      resolve: entryResolver,
    })
  },
})

