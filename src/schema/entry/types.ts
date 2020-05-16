import { inputObjectType, objectType } from '@nexus/schema'

export const Entry = objectType({
  name: 'Entry',
  definition(t) {
    t.string('id')
    t.string('item')
    t.string('value')
    t.field('occurred', { type: 'DateTime' })
    t.int('userId')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const EntryInput = inputObjectType({
  name: 'EntryInput',
  definition(t) {
    t.string('item')
    t.string('value')
    t.string('occurred')
  },
})
