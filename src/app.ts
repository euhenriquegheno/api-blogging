import fastify from 'fastify'
import { pessoaRoutes } from './http/controllers/pessoa/routes'

export const app = fastify()

app.register(pessoaRoutes)
