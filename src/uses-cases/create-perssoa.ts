import { IPessoa } from '../entities/models/pessoa.interface'
import { IPessoaRepository } from '../repositories/pessoa.repository.interface'

export class CreatePessoaUseCase {
  constructor(private pessoaRepository: IPessoaRepository) {}

  handler(pessoa: IPessoa) {
    return this.pessoaRepository.create(pessoa)
  }
}
