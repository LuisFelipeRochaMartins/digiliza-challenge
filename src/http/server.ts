import { fastifyCors } from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { makeNewReservation } from './routes/make-new-reservation'
import { registerNewUser } from './routes/register-new-user'
import { login } from './routes/login'
import { getAdminSummary } from './routes/get-admin-dashboard'
import { getReservationsByUserId } from './routes/get-reservations-user-id'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(makeNewReservation)
app.register(registerNewUser)
app.register(login)
app.register(getAdminSummary)
app.register(getReservationsByUserId)

app.listen({ port: 8080 }).then(() => {
  console.log('HTTP server running!')
})
