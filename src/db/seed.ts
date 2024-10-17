import * as argon2 from 'argon2'
import { client, db } from '.'
import { reservations, tables, users } from './schema'

async function seed() {
  await db.delete(users)
  await db.delete(tables)
  await db.delete(reservations)

  const password = await argon2.hash('teste1234')

  await db
    .insert(users)
    .values([
      { username: 'luis', password, role: 'admin' },
      { username: 'carol', password, },
      { username: 'marcos', password, },
    ])
    .returning()

  const mesas = Array.from({ length: 15 }, (_, index) => ({
    capacity: 4,
  }))

  await db.insert(tables).values(mesas).returning()
}

seed().finally(() => {
  client.end()
})
