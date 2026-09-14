import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeUpdatePublicacaoUseCase } from '../../../uses-cases/factory/make-update-publicacao-use-case'
import { Usuario } from '../../../entities/usuario.entity'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.uuid(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const registerBodySchema = z.object({
    titulo: z.string(),
    conteudo: z.string(),
    usuario_id: z.coerce.number(),
  })

  const { titulo, conteudo, usuario_id } = registerBodySchema.parse(
    request.body,
  )

  const updatePublicacaoUseCase = makeUpdatePublicacaoUseCase()
  const publicacao = await updatePublicacaoUseCase.handler(id, {
    titulo,
    conteudo,
    usuario: {
      id: usuario_id,
    } as Usuario,
  })

  return reply.status(200).send(publicacao)
}
