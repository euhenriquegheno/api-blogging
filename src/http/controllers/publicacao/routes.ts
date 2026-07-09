import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findPublicacao } from './find'
import { findAllPublicacao } from './find-all'
import { deletePublicacao } from './delete'

export async function publicacaoRoutes(app: FastifyInstance) {
  app.post('/publicacao', create)
  app.get('/publicacao/:id', findPublicacao)
  app.get('/publicacao', findAllPublicacao)
  app.delete('/publicacao/:id', deletePublicacao)
}
