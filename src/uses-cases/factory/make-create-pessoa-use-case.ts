import { PessoaRepository } from '../../repositories/pg/pessoa.repository'
import { CreatePessoaUseCase } from '../create-perssoa'

export function makeCreatePessoaUseCase() {
  const pessoaRepository = new PessoaRepository()
  const createPessoaUseCase = new CreatePessoaUseCase(pessoaRepository)
  return createPessoaUseCase
}
