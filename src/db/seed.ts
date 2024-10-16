import { client, db } from '.'
import { reservations, tables, users } from './schema'

async function seed() {
  await db.delete(users)
  await db.delete(tables)
  await db.delete(reservations)

  await db
    .insert(users)
    .values([
      { username: 'luis', password: 'teste1234' },
      { username: 'carol', password: 'teste1234' },
      { username: 'marcos', password: 'teste1234' },
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
