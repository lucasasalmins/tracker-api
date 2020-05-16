const bcrypt = require('bcryptjs')
import * as Auth from '../auth'
import * as UserEps from '../resolvers'

const existingEmail = 'test@mudano.com'
const newEmail = 'bugs@bunny.com'
const password = 'blahsword'
const mockSingleExistingUser = {
  email: existingEmail,
  id: 1,
  role: 'admin',
  password,
}
const mockNewUser = {
  email: newEmail,
  id: 2,
  role: 'admin',
  password,
}

const mockUserList = [mockSingleExistingUser, mockNewUser]

const findManyMock = jest.fn(async () => mockUserList)
const findOneMock = jest.fn(async ({ where: { email } }) => {
  if (email === existingEmail) return mockSingleExistingUser
  return null
})
const createMock = jest.fn(async () => mockNewUser)

const userMock = {
  findMany: findManyMock,
  findOne: findOneMock,
  create: createMock,
}

const mockContext = {
  prisma: {
    user: userMock,
  },
}

const mockTokens = { token: 'blah', refreshToken: 'blah2' } as Auth.Tokens
const existingPassword = 'blahblahblah'
const existingUser = {
  user: { email: existingEmail, password: existingPassword },
}
const hashedPassword = 'sdfjsiduvnskdjfhsijdbf'

afterEach(() => {
  jest.clearAllMocks()
})

describe('user Queries', () => {
  it('userResolver', async () => {
    const actual = await UserEps.userResolver({}, {}, mockContext)
    expect(findManyMock).toHaveBeenCalled()
    expect(actual).toMatchObject(mockUserList)
    // TODO: assert expected user type?
  })
})

describe('googleLoginResolver', () => {
  const token = 'dummy-google-token'
  const hashedPassword = 'blah-password'
  const mockExistingGoogleUser = {
    email: existingEmail,
    googleId: '123455667',
  } as Auth.GoogleUser
  const mockNewGoogleUser = {
    email: newEmail,
    googleId: '123455667',
  } as Auth.GoogleUser

  it('login valid password', async () => {
    jest
      .spyOn(Auth, 'verifyGoogleToken')
      .mockResolvedValue(mockExistingGoogleUser)
    jest.spyOn(Auth, 'createTokens').mockResolvedValue(mockTokens)
    jest.spyOn(bcrypt, 'compareSync').mockResolvedValue(true)

    const actual = await UserEps.googleLoginResolver({}, { token }, mockContext)
    expect(findOneMock).toHaveBeenCalled()
    expect(createMock).toHaveBeenCalledTimes(0)
    expect(actual).toMatchObject(mockTokens)
  })

  it('login invalid password', async () => {
    jest
      .spyOn(Auth, 'verifyGoogleToken')
      .mockResolvedValue(mockExistingGoogleUser)
    jest.spyOn(Auth, 'createTokens').mockResolvedValue(mockTokens)
    jest.spyOn(bcrypt, 'compareSync').mockResolvedValue(false)

    const actual = await UserEps.googleLoginResolver({}, { token }, mockContext)
    expect(actual).toBeInstanceOf(Error)
    expect(actual.message).toEqual('ERROR: Invalid password')
  })

  it('create user', async () => {
    jest.spyOn(Auth, 'verifyGoogleToken').mockResolvedValue(mockNewGoogleUser)
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword)

    const actual = await UserEps.googleLoginResolver({}, { token }, mockContext)
    expect(findOneMock).toHaveBeenCalled()
    expect(createMock).toHaveBeenCalledTimes(1)
    expect(actual).toMatchObject(mockTokens)
  })
})

describe('userCreateResolver', () => {
  const newPassword = 'sayyourprayersvarmit'
  const newAuthorisedEmail = 'test1@mudano.com'
  const newUnauthorisedUser = {
    user: { email: newEmail, password: newPassword },
  }
  const newAuthorisedUser = {
    user: { email: newAuthorisedEmail, password: newPassword },
  }

  it('only allows approved users to sign up', async () => {
    const actual = await UserEps.userCreateResolver(
      {},
      newUnauthorisedUser,
      mockContext,
    )
    expect(findOneMock).toHaveBeenCalledTimes(0)
    expect(actual).toBeInstanceOf(Error)
    expect(actual.message).toEqual('ERROR: You are not authorised.')
  })

  it('throws if user exists', async () => {
    const actual = await UserEps.userCreateResolver(
      {},
      existingUser,
      mockContext,
    )
    expect(findOneMock).toHaveBeenCalled()
    expect(actual).toBeInstanceOf(Error)
    expect(actual.message).toEqual(
      'ERROR: Email already in use. You may already have signed up with Google',
    )
  })

  it('creates a new user', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword)
    jest.spyOn(Auth, 'createTokens').mockResolvedValue(mockTokens)
    const actual = await UserEps.userCreateResolver(
      {},
      newAuthorisedUser,
      mockContext,
    )

    expect(findOneMock).toHaveBeenCalled()
    expect(createMock).toHaveBeenCalled()
    expect(actual).toMatchObject(mockTokens)
  })
})

describe('userLoginResolver', () => {
  // TODO: should we check the args.user is present, or does graphql take care of that?
  const newUser = { user: { email: newEmail, password } }

  it('throws when user does not exist', async () => {
    const actual = await UserEps.userLoginResolver({}, newUser, mockContext)

    expect(findOneMock).toHaveBeenCalled()
    expect(actual).toBeInstanceOf(Error)
    expect(actual.message).toEqual('ERROR: User does not exist')
  })

  it('logs in a user with a valid password', async () => {
    jest.spyOn(bcrypt, 'compareSync').mockResolvedValue(true)
    jest.spyOn(Auth, 'createTokens').mockResolvedValue(mockTokens)
    const actual = await UserEps.userLoginResolver(
      {},
      existingUser,
      mockContext,
    )

    expect(findOneMock).toHaveBeenCalledTimes(2)
    expect(actual).toMatchObject(mockTokens)
  })

  it('throws with an invalid password', async () => {
    jest.spyOn(bcrypt, 'compareSync').mockResolvedValue(false)
    const actual = await UserEps.userLoginResolver(
      {},
      existingUser,
      mockContext,
    )

    expect(actual).toBeInstanceOf(Error)
    expect(actual.message).toEqual('ERROR: Invalid password')
  })
})
