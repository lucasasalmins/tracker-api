import { OAuth2Client } from 'google-auth-library'
import { allow, and, rule, shield } from 'graphql-shield'
import { ContextParameters } from 'graphql-yoga/dist/types'
import * as jwt from 'jsonwebtoken'
import config from '../../utils/config'
import { logger } from '../../utils/logger'

const { GOOGLE_CLIENT_ID } = config


export type Tokens = {
  token: string
  refreshToken: string
}

export const createTokens = async (id: number, role: string): Promise<Tokens> => {
  const createToken = jwt.sign(
    { user: { id, role } },
    config.JWT_SECRET,
    { expiresIn: '14d' },
  )

  const createRefreshToken = jwt.sign(
    { user: { id } },
    config.JWT_SECRET,
    { expiresIn: '14d' },
  )
  const [token, refreshToken] = await Promise.all([createToken, createRefreshToken])
  return { token, refreshToken }
}

export const tryRefreshTokens = async (inToken: string, inRefreshToken: string, ctx: any, ) => {
  let userId = -1
  try {
    // @ts-ignore
    const { user } = jwt.verify(inRefreshToken, config.JWT_SECRET)
    logger.info(`${JSON.stringify(user)}`)
    userId = user.id
  } catch (error) {
    return {}
  }
  const user = await ctx.prisma.user.findOne({ where: { id: userId } })
  const { token, refreshToken } = await createTokens(user.id, user.role)
  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      role: user.role,
    },
  }
}

export type GoogleUser = {
  googleId: string
  firstName: string
  lastName: string
  email: string
  imageUrl: string
}

/**
 * Given a token from the client, authorise with google auth API and
 * return a user object
 * @param token
 */
export async function verifyGoogleToken(token: string, clientId: string): Promise<GoogleUser> {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID)

  try {
    const ticket = await client.verifyIdToken({ idToken: token, audience: clientId, })
    const payload: any = ticket.getPayload()
    return {
      googleId: payload.sub,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      imageUrl: payload.picture,
    }
  } catch (error) {
    logger.error(`verifyGoogleToken() Error: ${error}`)
    return Promise.reject(error)
  }
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}

// https://www.prisma.io/tutorials/graphql-rest-authentication-authorization-basics-ct20/#using-graphql-shield
// https://github.com/maticzav/graphql-shield
// Auth
export const getUser = async (ctx: ContextParameters) => {
  const inboundToken = ctx.request.get('x-token')
  // TODO: should we handle if a token is valid but for a user that has been deleted?
  if (inboundToken) {
    try {
      // check token is still valid
      // @ts-ignore
      const { user } = jwt.verify(inboundToken, config.JWT_SECRET)
      if (user) return user
      return null
    } catch (error) {
      // if token not still valid, we refresh the token
      const inboundRefreshToken = ctx.request.get('x-refresh-token')
      const { token, refreshToken, user } = await tryRefreshTokens(inboundToken, inboundRefreshToken, ctx)
      if (token && refreshToken) {
        ctx.response.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
        ctx.response.set('x-token', token)
        ctx.response.set('x-refresh-token', refreshToken)
      }
      return user
    }
  }
  return null
}

export const isAuthenticatedRule = async (parent, args, ctx, info) => {
  // logger.info(`isAuthenticated ctx.user ${JSON.stringify(ctx.user)}`)
  return !!ctx.user
}

// Rules
export const isAuthenticated = rule()(isAuthenticatedRule)

export const isAdminRule = async (parent, args, ctx, info) => {
  logger.info(`isAdminRule isAdmin: ${ctx.user.role === 'admin'}`)
  return ctx.user.role === 'admin'
}

// TODO: what is cache doing
export const isAdmin = rule({ cache: 'contextual' })(isAdminRule)

// Permissions
export const permissions = shield({
  Query: {
    users: and(isAuthenticated, isAdmin),
    entries: isAuthenticated,
    items: isAuthenticated
  },
  Mutation: {
    googleLogin: allow,
    userCreate: allow,
    userLogin: allow,
    createEntry: isAuthenticated
  },
})
