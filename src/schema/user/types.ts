import { enumType, inputObjectType, objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('firstName')
    t.string('lastName')
    t.string('email')
    t.field('role', { type: Role })
    // TODO: fix this - the asNexusMethod() isn't working yet
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    // t.date('createdAt', { type: 'DateTime' })
    // t.date('updatedAt', { type: 'DateTime' })
  },
})

export const UserLoginInput = inputObjectType({
  name: 'UserLogin',
  definition(t) {
    t.string('email', { required: true })
    t.string('password', { required: true })
  },
})

export const RefreshTokensInput = inputObjectType({
  name: 'RefreshTokens',
  definition(t) {
    t.string('refreshToken')
    t.string('token')
  },
})

export const UserLoginResponse = objectType({
  name: 'UserLoginResponse',
  definition(t) {
    t.string('refreshToken')
    t.string('token')
  },
})

export const GoogleUser = inputObjectType({
  name: 'GoogleUser',
  definition(t) {
    t.string('googleId', { required: true })
    t.string('firstName', { required: true })
    t.string('lastName', { required: true })
    t.string('email', { required: true })
    t.string('imageUrl', { required: true })
  },
})

export const Role = enumType({
  name: 'Role',
  members: ['user', 'admin'],
})
