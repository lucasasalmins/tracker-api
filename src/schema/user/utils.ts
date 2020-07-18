/**
 * Given a user object and a password, return a user for insertion into the database
 *
 * TODO: type the user coming in. enum of various user types?
 *
 * @param user
 * @param password
 */
export const constructUser = async (user: any, password: string) => {
  const timestamp = new Date()
  // console.log('timestamp', timestamp)

  return {
    googleId: user.googleId || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    googleImageUrl: user.imageUrl || '',
    email: user.email,
    role: 'admin',
    password,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}
