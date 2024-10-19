import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getTokenFromRequest } from '../../utils/request'
import { decrypt, getUsernameFromToken } from '../../utils/auth'
import { createNewReservation } from '../../cases/create-new-reservation'
import type { FastifyRequest } from 'fastify'

async function authenticateRequest(request: FastifyRequest, reply) {
  const token = getTokenFromRequest(request, true)

  if (!token) {
    throw new Error('Invalid or expired token!')
  }
  decrypt(token)
}

export const makeNewReservation: FastifyPluginAsyncZod = async (
  app,
  _options
) => {
  app.post(
    '/reservations',
    {
      schema: {
        body: z.object({
          date: z.string().date(),
          startDate: z.string().time(),
          endDate: z.string().time(),
          capacity: z.number().int().min(1).max(10),
        }),
      },
      preHandler: [authenticateRequest],
    },
    async request => {
      const { date, startDate, endDate, capacity } = request.body

      const token = getTokenFromRequest(request, true)
      const username = await getUsernameFromToken(token)

      return await createNewReservation({
        username,
        date,
        startDate,
        endDate,
        capacity,
      })
    }
  )
}
