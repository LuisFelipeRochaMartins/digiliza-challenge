import { db } from '../db'
import { reservations } from '../db/schema'
import { sql } from 'drizzle-orm'

interface AvailableTable extends Record<string, unknown> {
  id: number
  capacity: number
}

export async function createNewReservation({
  userId,
  date,
  startDate,
  endDate,
  capacity,
}) {
  const availableTable = await db.execute<AvailableTable>(sql`
    SELECT id
      FROM tables
     WHERE capacity >= ${capacity}
       AND id NOT IN (
        SELECT table_id
          FROM reservations 
         WHERE date = ${date} 
           AND (
            (start_time < ${startDate} AND end_time > ${endDate}) OR 
            (start_time < ${startDate} AND end_time > ${startDate})
          )
      )
      LIMIT 1`)

  const tableId = availableTable[0].id

  return await db
    .insert(reservations)
    .values({
      userId,
      date,
      startTime: startDate,
      endTime: endDate,
      tableId: tableId,
      status: 'confirmada',
    })
    .returning()
}
