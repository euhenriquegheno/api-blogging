import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findUsuario } from './find'
import { findAllUsuarios } from './find-all'
import { deleteUsuario } from './delete'
import { update } from './update'

export async function usuarioRoutes(app: FastifyInstance) {
  app.post('/user', create)
  app.get('/user/:id', findUsuario)
  app.get('/user', findAllUsuarios)
  app.delete('/user/:id', deleteUsuario)
  app.put('/user/:id', update)
}
