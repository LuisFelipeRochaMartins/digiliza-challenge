import { and, eq } from 'drizzle-orm'
import { db } from '../db'
import { reservations } from '../db/schema'

export async function getAdminDashboard() {
  const reservs = await db
    .select({
      tableId: reservations.tableId,
      date: reservations.date,
      startTime: reservations.startTime,
      endTime: reservations.endTime,
    })
    .from(reservations)
    .where(eq(reservations.status, 'confirmada'))
    .groupBy(reservations.tableId, reservations.date)

  return reservs
}
