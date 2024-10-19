import { db } from '../db'
import { reservations, users } from '../db/schema'
import { eq, sql } from 'drizzle-orm'
import { getUsernameFromToken } from '../utils/auth'

interface AvailableTable extends Record<string, unknown> {
  id: number
  capacity: number
}

export async function createNewReservation({
  username,
  date,
  startDate,
  endDate,
  capacity,
}) {
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username))

  const availableTable = await db.execute<AvailableTable>(sql`
    SELECT id
      FROM tables
     WHERE capacity >= ${capacity}
       AND id NOT IN (
    SELECT table_id
      FROM reservations 
     WHERE date = ${date}
       AND (
          (start_time < ${endDate} AND end_time > ${startDate})
       )
    )
    LIMIT 1`)

  const tableId = availableTable[0]?.id
  const userId = user[0]?.id

  return await db
    .insert(reservations)
    .values({
      userId: userId,
      date,
      startTime: startDate,
      endTime: endDate,
      tableId: tableId,
      status: 'confirmada',
    })
    .returning()
}
