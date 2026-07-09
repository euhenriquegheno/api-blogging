import { Repository } from 'typeorm'
import { IPublicacaoRepository } from '../publicacao.repository.interface'
import { Publicacao } from '../../entities/publicacao.entity'
import { appDataSource } from '../../lib/typeorm/typeorm'
import { IPublicacao } from '../../entities/models/publicacao.interface'

export class PublicacaoRepository implements IPublicacaoRepository {
  private repository: Repository<Publicacao>

  constructor() {
    this.repository = appDataSource.getRepository(Publicacao)
  }

  async findAll(page: number, limit: number): Promise<IPublicacao[]> {
    return this.repository.find({
      relations: { usuario: true },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async findById(id: string): Promise<IPublicacao | null> {
    return this.repository.findOne({
      relations: { usuario: true },
      where: { id },
    })
  }

  async create(publicacao: IPublicacao): Promise<IPublicacao> {
    return this.repository.save(publicacao)
  }

  update(publicacao: IPublicacao): Promise<IPublicacao> {
    return this.repository.save(publicacao)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
