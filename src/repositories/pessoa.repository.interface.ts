import { IPessoa } from '../entities/models/pessoa.interface'

export interface IPessoaRepository {
  create(pessoa: IPessoa): Promise<IPessoa | undefined>
}
