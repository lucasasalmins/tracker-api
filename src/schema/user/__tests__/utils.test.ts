import * as User from '../utils'

const email = 'lucas.salmins@mudano.com'
const password = 'insecurePassword'
const googleUser = {
  googleId: '1234567',
  firstName: 'Daffy',
  lastName: 'Duck',
  email: 'daffy@duck.com',
  imageUrl: '',
}

it('construct user', async () => {
  const mockTimestamp = Date.now()
  jest.spyOn(Date, 'now').mockReturnValue(mockTimestamp)
  const user = await User.constructUser({ email }, password)

  const expected = {
    googleId: '',
    firstName: '',
    lastName: '',
    googleImageUrl: '',
    email,
    role: 'admin',
    password,
    createdAt: mockTimestamp,
    updatedAt: mockTimestamp,
  }
  expect(user).toMatchObject(expected)
})
