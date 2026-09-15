import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreatePublicacaoUseCase } from '../../../uses-cases/factory/make-create-publicacao-use-case'
import { Usuario } from '../../../entities/usuario.entity'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    titulo: z.string(),
    conteudo: z.string(),
    usuario_id: z.coerce.number(),
  })

  const { titulo, conteudo, usuario_id } = registerBodySchema.parse(
    request.body,
  )

  const createPublicacaoUseCase = makeCreatePublicacaoUseCase()

  const publicacao = await createPublicacaoUseCase.handler({
    titulo,
    conteudo,
    usuario: {
      id: usuario_id,
    } as Usuario,
  })

  return reply.status(201).send(publicacao)
}
