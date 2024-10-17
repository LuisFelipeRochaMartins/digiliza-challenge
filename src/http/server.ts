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

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(makeNewReservation)
app.register(registerNewUser)
app.register(login)

app.listen({ port: 8080 }).then(() => {
  console.log('HTTP server running!')
})
