import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id'),
  username: varchar('username', { length: 50 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const tables = pgTable('tables', {
  id: serial('id'),
  number: integer('number').notNull().unique(),
  capacity: integer('capacity').notNull(),
})

export const statusEnum = pgEnum('status', [
  'confirmada',
  'cancelada',
  'concluida',
])

export const reservations = pgTable('reservations', {
  id: serial('id'),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  tableId: integer('table_id')
    .references(() => tables.id)
    .notNull(),
  reservationDate: timestamp('reservation_date', {
    withTimezone: true,
  }).notNull(),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  endTime: timestamp('end_time', { withTimezone: true }).notNull(),
  status: statusEnum('status'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const dayOfWeek = pgEnum('dayOfWeek', ['1', '2', '3', '4', '5', '6'])

export const availableHours = pgTable('available_hours', {
  id: serial('id'),
  dayOfWeek: dayOfWeek('day_of_week'),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  endTime: timestamp('end_time', { withTimezone: true }).notNull(),
})
