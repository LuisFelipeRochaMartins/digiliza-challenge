import type { FastifyRequest } from 'fastify'

export function getTokenFromRequest(request: FastifyRequest, skip = false) {
  const authHeader = request.headers?.authorization
  if (skip) {
    return authHeader
  }

  if (!authHeader) {
    throw new Error('Authorization header is missing!')
  }
  return authHeader.split(' ')[1]
}
