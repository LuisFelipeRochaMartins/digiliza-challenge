import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getTokenFromRequest } from '../../utils/request'
import { decrypt } from '../../utils/auth'
import { createNewReservation } from '../../cases/create-new-reservation'

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
    },
    async request => {
      const { userId, date, startDate, endDate, capacity } = request.body

      const token = getTokenFromRequest(request)
      decrypt(token)

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
