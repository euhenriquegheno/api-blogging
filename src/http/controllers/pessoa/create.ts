import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreatePessoaUseCase } from '../../../uses-cases/factory/make-create-pessoa-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    usuario_id: z.coerce.number(),
    nome: z.string(),
    cpf: z.string(),
    tipo: z.coerce.number(),
  })

  const { usuario_id, nome, cpf, tipo } = registerBodySchema.parse(request.body)

  const createPessoaUseCase = makeCreatePessoaUseCase()

  const pessoa = await createPessoaUseCase.handler({
    usuario_id,
    nome,
    cpf,
    tipo,
  })

  return reply.status(201).send(pessoa)
}
