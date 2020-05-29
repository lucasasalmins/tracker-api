import { arg, extendType, mutationField } from '@nexus/schema'
import { fetchUniqueItems } from '../../db/sql'
import { logger } from '../../utils/logger'
import { Entry, EntryInput } from './types'


export const entryResolver = async (_, args, ctx) => {
  try {
    const entries = await ctx.prisma.entry.findMany({
      where: { userId: ctx.user.id },
      orderBy: { occurred: 'desc' }
    })
    return entries
  } catch (error) {
    logger.error(error)
    return error
  }
}

export const entries = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('entries', {
      type: Entry,
      resolve: entryResolver,
    })
  },
})

type EntryItem = string
type EntryItemCount = number

type ItemResult = {
  item: EntryItem
  freq: EntryItemCount
}

const parseItem = (item: EntryItem): EntryItem => {
  return item
    .trim()
    .toLowerCase()
}

export const entryItemResolver = async (_, args, ctx): Promise<EntryItem[]> => {
  try {
    const rawItems = await ctx.prisma.raw(fetchUniqueItems(ctx.user.id))
    const parsedItems = rawItems.map((itemResult: ItemResult) => parseItem(itemResult.item))
    const uniqueparsedItems: Set<string> = new Set(parsedItems)
    return [...uniqueparsedItems]
  } catch (error) {
    logger.error(error)
    return error
  }
}

export const entryItems = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('items', {
      type: 'String',
      resolve: entryItemResolver,
    })
  },
})

export const createEntryResolver = async (_, args, ctx) => {

  try {
    const timestamp = Date.now()
    const data = {
      ...args.entry,
      occurred: Date.parse(args.entry.occurred),
      createdAt: timestamp,
      updatedAt: timestamp,
      User: { connect: { id: ctx.user.id } },
    }
    // console.log('data', data)
    const entry = await ctx.prisma.entry.create({ data })
    return entry
  } catch (error) {
    logger.error(error)
    return error
  }
}

export const createEntry = mutationField('createEntry', {
  type: Entry,
  args: { entry: arg({ type: EntryInput, required: true }) },
  resolve: createEntryResolver,
})

