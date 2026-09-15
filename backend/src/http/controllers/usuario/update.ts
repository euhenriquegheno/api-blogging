import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeUpdateUsuarioUseCase } from '../../../uses-cases/factory/make-update-usuario-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.number().int(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const registerBodySchema = z.object({
    email: z.string(),
    nome: z.string(),
    senha: z.string(),
    cpf: z.string(),
    tipo: z.number().int(),
  })

  const { email, nome, senha, cpf, tipo } = registerBodySchema.parse(
    request.body,
  )

  const updateUsuarioUseCase = makeUpdateUsuarioUseCase()
  const usuario = await updateUsuarioUseCase.handler(id, {
    email,
    nome,
    senha,
    cpf,
    tipo,
  })

  return reply.status(200).send(usuario)
}
