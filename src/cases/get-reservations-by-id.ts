import { eq } from 'drizzle-orm'
import { reservations, tables, users } from '../db/schema'
import { db } from '../db'

export async function getReservationsById({ username }) {
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username))
    .limit(1)

  if (user.length === 0) {
    throw new Error('User not found')
  }

  const userId = user[0].id

  return await db
    .select({
      id: reservations.id,
      date: reservations.date,
      startTime: reservations.startTime,
      endTime: reservations.endTime,
      capacity: tables.capacity,
      tableId: tables.id,
    })
    .from(reservations)
    .innerJoin(tables, eq(tables.id, reservations.tableId))
    .where(eq(reservations.userId, userId))
}
