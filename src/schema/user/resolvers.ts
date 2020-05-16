import { arg, extendType, mutationField, stringArg } from '@nexus/schema'
import config from '../../utils/config'
import { logger } from '../../utils/logger'
import { createTokens, tryRefreshTokens, verifyGoogleToken } from './auth'
import { User, UserLoginInput, UserLoginResponse } from './types'
import { constructUser } from './utils'
const bcrypt = require('bcryptjs')

const { GOOGLE_CLIENT_ID } = config

const approvedUsers = [
  'test@mudano.com',
  'test1@mudano.com',
]

export const userResolver = async (_, args, ctx) => {
  try {
    const users = await ctx.prisma.user.findMany()
    console.log(users)
    return users
  } catch (error) {
    logger.error(error)
    return error
  }
}

export const users = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: User,
      resolve: userResolver,
    })
  },
})

export const googleLoginResolver = async (_, { token: googleToken }, ctx) => {
  console.log(googleToken)
  try {
    const googleUser = await verifyGoogleToken(googleToken, GOOGLE_CLIENT_ID)
    const { email, googleId } = googleUser

    const user = await ctx.prisma.user.findOne({ where: { email } })
    // NOTE: this uses the googleUserId as the password
    if (!user) {
      const hashedPassword = await bcrypt.hash(googleUser.googleId, 10)
      const data = await constructUser(googleUser, hashedPassword)
      const user = await ctx.prisma.user.create({ data })

      return await createTokens(user.id, user.role)
    }

    const validPassword = await bcrypt.compareSync(googleId, user.password)

    if (validPassword) return await createTokens(user.id, user.role)
    if (!validPassword) throw new Error('ERROR: Invalid password')
  } catch (error) {
    logger.error(error)
    return error
  }
}

export const googleLogin = mutationField('googleLogin', {
  type: UserLoginResponse,
  args: { token: stringArg({ required: true }) },
  resolve: googleLoginResolver,
})

export const userCreateResolver = async (_, args, ctx) => {
  const { email, password } = args.user
  try {
    if (!approvedUsers.includes(email))
      throw new Error('ERROR: You are not authorised.')

    const existingUser = await ctx.prisma.user.findOne({ where: { email } })
    if (existingUser)
      throw new Error(
        'ERROR: Email already in use. You may already have signed up with Google',
      )

    const hashedPassword = await bcrypt.hash(password, 10)
    const data = await constructUser({ email }, hashedPassword)
    const user = await ctx.prisma.user.create({ data })

    return await createTokens(user.id, user.role)
  } catch (error) {
    logger.error(error)
    return error
  }
}

export const userCreate = mutationField('userCreate', {
  type: UserLoginResponse,
  args: { user: arg({ type: UserLoginInput, required: true }) },
  resolve: userCreateResolver,
})

export const userLoginResolver = async (_, args, ctx) => {
  const { email, password } = args.user
  try {
    const existingUser = await ctx.prisma.user.findOne({ where: { email } })

    if (!existingUser) throw new Error('ERROR: User does not exist')
    const { password: savedPassword, ...user } = await ctx.prisma.user.findOne({
      where: { email },
    })

    const validPassword = await bcrypt.compareSync(password, savedPassword)
    if (validPassword) return await createTokens(user.id, user.role)
    if (!validPassword) throw new Error('ERROR: Invalid password')
  } catch (error) {
    logger.error(error)
    return error
  }
}

export const userLogin = mutationField('userLogin', {
  type: UserLoginResponse,
  args: {
    user: arg({ type: UserLoginInput, required: true }),
  },
  resolve: userLoginResolver,
})

export const refreshTokensResolver = async (_, args, ctx) => {
  const { token, refreshToken } = args
  try {
    return await tryRefreshTokens(token, refreshToken, ctx)
  } catch (error) {
    logger.error(error)
    return error
  }
}

export const refreshTokens = mutationField('refreshTokens', {
  type: UserLoginResponse,
  args: {
    token: stringArg({ required: true }),
    refreshToken: stringArg({ required: true }),
  },
  resolve: refreshTokensResolver,
})
