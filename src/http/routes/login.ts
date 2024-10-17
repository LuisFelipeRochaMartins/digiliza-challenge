import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyUserLogin } from '../../cases/verify-login-user'

export const login: FastifyPluginAsyncZod = async (app, _options) => {
  app.post(
    '/login',
    {
      schema: {
        body: z.object({
          username: z.string(),
          password: z.string().min(8).max(16),
        }),
      },
    },
    async request => {
      const { username, password } = request.body

      return await verifyUserLogin({ username, password })
    }
  )
}
