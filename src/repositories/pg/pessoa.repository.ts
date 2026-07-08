import { IPessoa } from '../../entities/models/pessoa.interface'
import { database } from '../../lib/pg/db'
import { IPessoaRepository } from '../pessoa.repository.interface'

export class PessoaRepository implements IPessoaRepository {
  async create({
    usuario_id,
    nome,
    cpf,
    tipo,
  }: IPessoa): Promise<IPessoa | undefined> {
    const result = await database.clientInstance?.query(
      'INSERT INTO pessoa (nome, cpf, tipo, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, cpf, tipo, usuario_id],
    )

    return result?.rows[0]
  }
}
