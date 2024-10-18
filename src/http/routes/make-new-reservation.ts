import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getTokenFromRequest } from '../../utils/request'
import { decrypt, getRoleFromToken } from '../../utils/auth'
import { createNewReservation } from '../../cases/create-new-reservation'

async function authenticateRequest(request, reply) {
  try {
    const token = getTokenFromRequest(request)

    if (!token) {
      throw new Error('Invalid or expired token!')
    }

    decrypt(token)
  } catch (_) {
    reply.code(401).send({ error: 'Unauthorized' })
  }
}

export const makeNewReservation: FastifyPluginAsyncZod = async (
  app,
  _options
) => {
  app.post(
    '/reservation',
    {
      schema: {
        body: z.object({
          userId: z.number().int(),
          date: z.string().date(),
          startDate: z.string().time(),
          endDate: z.string().time(),
          capacity: z.number().int().min(1).max(10),
        }),
      },
      preHandler: [authenticateRequest],
    },
    async request => {
      const { userId, date, startDate, endDate, capacity } = request.body

      return await createNewReservation({
        userId,
        date,
        startDate,
        endDate,
        capacity,
      })
    }
  )
}
