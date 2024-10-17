import { db } from '../db'
import { users } from '../db/schema'
import { encrypt } from '../utils/auth'
import * as argon2 from 'argon2'

interface user {
  username: string
  password: string
  isAdmin?: boolean
}

export async function createNewUser({ username, password, isAdmin }: user) {
  password = await argon2.hash(password)

  const role = isAdmin ? 'admin' : 'user'
  const user = await db
    .insert(users)
    .values({ username, password, role })
    .returning()

  return await encrypt({ username, password, role })
}
