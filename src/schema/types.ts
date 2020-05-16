import { inputObjectType, scalarType } from '@nexus/schema'
// export const GQLDate = asNexusMethod(GraphQLDate, "date")

export const Filter = inputObjectType({
  name: 'Filter',
  definition(t) {
    t.string('field', { required: true })
    t.list.string('values')
  },
})

export const DateScalar = scalarType({
  name: 'DateTime',
  asNexusMethod: 'dateTime',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return new Date(value)
  },
})
