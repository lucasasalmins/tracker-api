import { arg, extendType, mutationField, stringArg } from '@nexus/schema'
import { fetchUniqueDays, fetchUniqueItems } from '../../db/sql'
import { logger } from '../../utils/logger'
import { Entry, EntryInput } from './types'


/////////////////////////////////////////////////
// Entries
/////////////////////////////////////////////////
export const entryResolver = async (_, args, ctx) => {
  try {
    const day = args.day
    const occurred = new Date(day)
    const tomorrow = new Date(occurred.setDate(occurred.getDate() + 1))
    console.log(occurred)
    console.log(tomorrow)
    const where = day ?
      {
        userId: ctx.user.id,
        occurred: {
          gte: new Date(day),
          lte: tomorrow
        }
      }
      : { userId: ctx.user.id }
    const entries = await ctx.prisma.entry.findMany({
      where,
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
      // TODO: type this
      args: { day: stringArg() },
      resolve: entryResolver,
    })
  },
})


/////////////////////////////////////////////////
// Entry Days
/////////////////////////////////////////////////
type EntryDay = String

type EntryDayItem = {
  occurred: EntryDay
}

const parseDates = (date: EntryDay): EntryDay => date.split('T')[0]

// TODO: this is return DateTime, it needs to return just date
export const entryDayResolver = async (_, args, ctx): Promise<EntryDay[]> => {
  try {
    const rawDays = await ctx.prisma.raw(fetchUniqueDays(ctx.user.id))
    const parsedItems = rawDays.map((itemResult: EntryDayItem) => parseDates(itemResult.occurred))
    const uniqueparsedDays: Set<EntryDay> = new Set(parsedItems)
    console.log('uniqueparsedDays', uniqueparsedDays)
    return [...uniqueparsedDays]
  } catch (error) {
    logger.error(error)
    return error
  }
}


export const entryDays = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('days', {
      type: 'Date',
      resolve: entryDayResolver,
    })
  },
})



/////////////////////////////////////////////////
// Entry Items
/////////////////////////////////////////////////
type EntryItem = string
type EntryItemCount = number

type ItemResult = {
  item: EntryItem
  freq: EntryItemCount
}

// how can this be made generalisable but also return the right type
// is this where a partial comes in? TODO: fp-ts
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


/////////////////////////////////////////////////
// Create Entry
/////////////////////////////////////////////////
export const createEntryResolver = async (_, args, ctx) => {

  try {
    const timestamp = new Date()
    const data = {
      ...args.entry,
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

