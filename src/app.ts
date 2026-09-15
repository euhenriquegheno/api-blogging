import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { usuarioRoutes } from './http/controllers/usuario/routes'
import { publicacaoRoutes } from './http/controllers/publicacao/routes'
import { globalErrorHandler } from './utils/global-error-handler'

export const app = fastify()

app.register(swagger, {
  openapi: {
    info: {
      title: 'API Blogging',
      description: 'API REST para uma plataforma educacional de publicações.',
      version: '1.0.0',
    },
    tags: [
      { name: 'Posts', description: 'Operações com postagens' },
      { name: 'Usuários', description: 'Operações com docentes e usuários' },
    ],
  },
})

app.register(usuarioRoutes)
app.register(publicacaoRoutes)

app.register(swaggerUi, {
  routePrefix: '/docs',
})

app.setErrorHandler(globalErrorHandler)
