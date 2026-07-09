import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function publicacaoRoutes(app: FastifyInstance) {
  app.post('/publicacao', create)
}
