import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface'

export class DeletePublicacaoUseCase {
  constructor(private publicacaoRepository: IPublicacaoRepository) {}

  async handler(id: string) {
    return this.publicacaoRepository.delete(id)
  }
}
