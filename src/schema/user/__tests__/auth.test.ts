jest.mock('google-auth-library')
import { OAuth2Client } from 'google-auth-library'
import * as jwt from 'jsonwebtoken'
import config from '../../../utils/config'
import * as Auth from '../auth'

const { GOOGLE_CLIENT_ID } = config

const verifyTokenMock = jest.fn(() => ({
  getPayload: () => ({
    sub: '12345',
    given_name: 'Daffy',
    family_name: 'Duck',
    email: 'daffy@gmail.com',
    picture: '',
  }),
}))

// @ts-ignore
OAuth2Client.mockImplementation(() => ({
  verifyIdToken: verifyTokenMock,
}))

describe('Authentication', () => {
  it('createTokens', async () => {
    const id = 12345
    const role = 'admin'
    const token = jwt.sign({ user: { id, role } }, config.JWT_SECRET, {
      expiresIn: '14d',
    })
    const refreshToken = jwt.sign({ user: { id } }, config.JWT_SECRET, {
      expiresIn: '14d',
    })

    expect(await Auth.createTokens(id, role)).toMatchObject({
      token,
      refreshToken,
    })
  })

  it('verifyGoogleToken', async () => {
    const expected = {
      googleId: '12345',
      firstName: 'Daffy',
      lastName: 'Duck',
      email: 'daffy@gmail.com',
      imageUrl: '',
    }

    const idToken = 'blah'

    expect(
      await Auth.verifyGoogleToken(idToken, GOOGLE_CLIENT_ID),
    ).toMatchObject(expected)
    expect(verifyTokenMock).toHaveBeenCalledWith({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    })
  })
})

describe('Authorization', () => {
  it('isAuthenticated authenticated', async () => {
    const expected = await Auth.isAuthenticatedRule(
      {},
      {},
      { user: { id: 1, role: 'admin' } },
      {},
    )
    expect(expected).toBe(true)
  })

  it('isAuthenticated NOT authenticated', async () => {
    const expected = await Auth.isAuthenticatedRule({}, {}, {}, {})
    expect(expected).toBe(false)
  })

  it('isAdmin', async () => {
    const expected = await Auth.isAdminRule(
      {},
      {},
      { user: { id: 1, role: 'admin' } },
      {},
    )
    expect(expected).toBe(true)
  })

  it('isAdmin NOT admin', async () => {
    const expected = await Auth.isAdminRule(
      {},
      {},
      { user: { id: 1, role: 'user' } },
      {},
    )
    expect(expected).toBe(false)
  })
})
