import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateUsuarioUseCase } from '../../../uses-cases/factory/make-create-usuario-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string(),
    senha: z.string(),
    nome: z.string(),
    cpf: z.string(),
    tipo: z.coerce.number(),
  })

  const { email, senha, nome, cpf, tipo } = registerBodySchema.parse(
    request.body,
  )

  const createPessoaUseCase = makeCreateUsuarioUseCase()

  const pessoa = await createPessoaUseCase.handler({
    email,
    senha,
    nome,
    cpf,
    tipo,
  })

  return reply.status(201).send(pessoa)
}
