import type { FastifyRequest } from 'fastify'

export function getTokenFromRequest(request: FastifyRequest) {
  const authHeader = request.headers?.authorization
  if (!authHeader) {
    throw new Error('Authorization header is missing!')
  }

  return authHeader.split(' ')[1]
}
