import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findUsuario } from './find'
import { findAllUsuarios } from './find-all'
import { deleteUsuario } from './delete'
import { update } from './update'
import { usuarioBodySchema, usuarioSchema } from '../../swagger-schemas'

export async function usuarioRoutes(app: FastifyInstance) {
  app.post(
    '/user',
    {
      schema: {
        tags: ['Usuários'],
        summary: 'Cria um usuário',
        body: usuarioBodySchema,
        response: { 201: usuarioSchema },
      },
    },
    create,
  )

  app.get(
    '/user/:id',
    {
      schema: {
        tags: ['Usuários'],
        summary: 'Obtém um usuário pelo ID',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'number' } },
        },
        response: { 200: usuarioSchema },
      },
    },
    findUsuario,
  )

  app.get(
    '/user',
    {
      schema: {
        tags: ['Usuários'],
        summary: 'Lista usuários',
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'number', default: 1 },
            limit: { type: 'number', default: 10 },
          },
        },
        response: { 200: { type: 'array', items: usuarioSchema } },
      },
    },
    findAllUsuarios,
  )

  app.delete(
    '/user/:id',
    {
      schema: {
        tags: ['Usuários'],
        summary: 'Exclui um usuário',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'number' } },
        },
        response: { 204: { type: 'null' } },
      },
    },
    deleteUsuario,
  )

  app.put(
    '/user/:id',
    {
      schema: {
        tags: ['Usuários'],
        summary: 'Edita um usuário',
        params: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'number' } },
        },
        body: usuarioBodySchema,
        response: { 200: usuarioSchema },
      },
    },
    update,
  )
}
