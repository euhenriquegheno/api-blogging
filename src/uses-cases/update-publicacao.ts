import { IPublicacao } from '../entities/models/publicacao.interface'
import { IPublicacaoRepository } from '../repositories/publicacao.repository.interface'

export class UpdatePublicacaoUseCase {
  constructor(private publicacaoRepository: IPublicacaoRepository) {}

  async handler(id: string, publicacaoAtt: IPublicacao) {
    const publicacao = await this.publicacaoRepository.findById(id)

    if (!publicacao) {
      throw new Error('Publicacao not found')
    }

    return this.publicacaoRepository.update(publicacaoAtt)
  }
}
