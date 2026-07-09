import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeletePublicacaoUseCase } from '../../../uses-cases/factory/make-delete-publicacao-use-case'
import z from 'zod'

export async function deletePublicacao(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const deletePublicacaoUseCase = makeDeletePublicacaoUseCase()
  await deletePublicacaoUseCase.handler(id)

  return reply.status(204).send()
}
