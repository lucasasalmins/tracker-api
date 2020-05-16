import { objectType } from '@nexus/schema'

export const Entry = objectType({
  name: 'Entry',
  definition(t) {
    t.string('id')
    t.string('item')
    t.string('value')
    t.string('occurred')
    t.int('userId')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})
