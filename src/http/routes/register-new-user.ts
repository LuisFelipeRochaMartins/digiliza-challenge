import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createNewUser } from '../../cases/create-new-user'

export const registerNewUser: FastifyPluginAsyncZod = async (app, _options) => {
  app.post(
    '/user/register',
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
      return await createNewUser({ username, password, isAdmin: false })
    }
  )
}
