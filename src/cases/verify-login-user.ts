import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import { encrypt } from '../utils/auth'
import * as argon2 from 'argon2'

export async function verifyUserLogin({ username, password }) {
  const result = await db
    .select()
    .from(users)
    .where(eq(username, users.username))

  const user = result[0]
  const passwordVerified = await argon2.verify(user.password, password)

  if (!passwordVerified) {
    throw new Error('Invalid username or password')
  }

  return await encrypt({ ...user })
}
