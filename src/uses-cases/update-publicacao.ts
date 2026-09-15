import { IPublicacao } from '../entities/models/publicacao.interface'
import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found'

export class UpdatePublicacaoUseCase {
  constructor(private publicacaoRepository: IPublicacaoRepository) {}

  async handler(id: string, publicacaoNew: IPublicacao) {
    const publicacaoOld = await this.publicacaoRepository.findById(id)

    if (!publicacaoOld) {
      throw new ResourceNotFoundError('Publicação não encontrada')
    }

    return this.publicacaoRepository.update({
      ...publicacaoOld,
      ...publicacaoNew,
      id,
    })
  }
}
