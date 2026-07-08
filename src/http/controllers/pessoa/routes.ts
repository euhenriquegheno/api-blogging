import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function pessoaRoutes(app: FastifyInstance) {
  app.post('/pessoa', create)
}
