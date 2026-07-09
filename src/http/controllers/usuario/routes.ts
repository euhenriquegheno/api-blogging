import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function usuarioRoutes(app: FastifyInstance) {
  app.post('/usuario', create)
}
