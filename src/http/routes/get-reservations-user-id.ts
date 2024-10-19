import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getTokenFromRequest } from '../../utils/request'
import { getUsernameFromToken } from '../../utils/auth'
import { getReservationsById } from '../../cases/get-reservations-by-id'

export const getReservationsByUserId: FastifyPluginAsyncZod = async (
  app,
  _options
) => {
  app.get('/reservations', {}, async request => {
    const token = getTokenFromRequest(request)
    const username = await getUsernameFromToken(token)

    return await getReservationsById({ username })
  })
}
