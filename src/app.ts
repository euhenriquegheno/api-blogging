import fastify from 'fastify'
import { usuarioRoutes } from './http/controllers/usuario/routes'
import { publicacaoRoutes } from './http/controllers/publicacao/routes'

export const app = fastify()

app.register(usuarioRoutes)
app.register(publicacaoRoutes)
