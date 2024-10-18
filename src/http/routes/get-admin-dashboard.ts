import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getTokenFromRequest } from '../../utils/request'
import { getRoleFromToken } from '../../utils/auth'
import { getAdminDashboard } from '../../cases/get-admin-dashboard'

async function authenticateRequest(request, reply) {
  try {
    const token = getTokenFromRequest(request)
    const role = await getRoleFromToken(token)

    if (role !== 'admin') {
      throw new Error('Only Administrators can access this route!')
    }
  } catch (_) {}
}

export const getAdminSummary: FastifyPluginAsyncZod = async (app, _options) => {
  app.get('/admin', { preHandler: [authenticateRequest] }, async request => {
    return await getAdminDashboard()
  })
}
