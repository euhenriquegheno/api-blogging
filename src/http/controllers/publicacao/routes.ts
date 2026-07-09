import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findPublicacao } from './find'
import { findAllPublicacao } from './find-all'
import { deletePublicacao } from './delete'
import { update } from './update'

export async function publicacaoRoutes(app: FastifyInstance) {
  app.post('/publicacao', create)
  app.get('/publicacao/:id', findPublicacao)
  app.get('/publicacao', findAllPublicacao)
  app.delete('/publicacao/:id', deletePublicacao)
  app.put('/publicacao/:id', update)
}
