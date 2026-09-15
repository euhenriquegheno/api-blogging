import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found'

export class DeletePublicacaoUseCase {
  constructor(private publicacaoRepository: IPublicacaoRepository) {}

  async handler(id: string): Promise<void> {
    const deleted = await this.publicacaoRepository.delete(id)

    if (!deleted) {
      throw new ResourceNotFoundError('Publicação não encontrada')
    }
  }
}
