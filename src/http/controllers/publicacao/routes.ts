import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findPublicacao } from './find'
import { findAllPublicacao } from './find-all'
import { deletePublicacao } from './delete'
import { update } from './update'
import { searchPublicacoes } from './search'

export async function publicacaoRoutes(app: FastifyInstance) {
  app.get('/posts/search', searchPublicacoes)
  app.get('/posts', findAllPublicacao)
  app.get('/posts/:id', findPublicacao)
  app.post('/posts', create)
  app.put('/posts/:id', update)
  app.delete('/posts/:id', deletePublicacao)
}
