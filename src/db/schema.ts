import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  time,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const tables = pgTable('tables', {
  id: serial('id').primaryKey(),
  capacity: integer('capacity').notNull(),
})

export const statusEnum = pgEnum('status', [
  'confirmada',
  'cancelada',
  'concluida',
])

export const reservations = pgTable('reservations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  tableId: integer('table_id')
    .references(() => tables.id)
    .notNull(),
  date: date('date', { mode: 'string' }).notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  status: statusEnum('status'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
