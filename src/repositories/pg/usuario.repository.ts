import { IUsuario } from '../../entities/models/usuario.interface'
import { database } from '../../lib/pg/db'
import { IUsuarioRepository } from '../usuario.repository.interface'

export class UsuarioRepository implements IUsuarioRepository {
  async create({
    email,
    senha,
    nome,
    cpf,
    tipo,
  }: IUsuario): Promise<IUsuario | undefined> {
    const result = await database.clientInstance?.query(
      'INSERT INTO usuario (email, senha, nome, cpf, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, senha, nome, cpf, tipo],
    )

    return result?.rows[0]
  }
}
