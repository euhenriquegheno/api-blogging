import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findUsuario } from './find'
import { findAllUsuarios } from './find-all'
import { deleteUsuario } from './delete'
import { update } from './update'

export async function usuarioRoutes(app: FastifyInstance) {
  app.post('/usuario', create)
  app.get('/usuario/:id', findUsuario)
  app.get('/usuario', findAllUsuarios)
  app.delete('/usuario/:id', deleteUsuario)
  app.put('/usuario/:id', update)
}
