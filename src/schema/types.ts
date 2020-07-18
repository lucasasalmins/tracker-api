import { inputObjectType, scalarType } from '@nexus/schema'
// export const GQLDate = asNexusMethod(GraphQLDate, "date")

export const Filter = inputObjectType({
  name: 'Filter',
  definition(t) {
    t.string('field', { required: true })
    t.list.string('values')
  },
})

export const DateTimeScalar = scalarType({
  name: 'DateTime',
  asNexusMethod: 'dateTime',
  description: 'DateTime custom scalar type',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return new Date(value)
  },
})

export const DateScalar = scalarType({
  name: 'Date',
  asNexusMethod: 'date',
  description: 'Date custom scalar type',
  parseValue(value) {
    // TODO: return just the date, NO TIME
    return new Date(value)
  },
  serialize(value) {
    // TODO: return just the date, NO TIME
    return new Date(value)
  },
})
