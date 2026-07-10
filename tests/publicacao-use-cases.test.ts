import { beforeEach, describe, expect, it } from '@jest/globals'
import { IPublicacao } from '../src/entities/models/publicacao.interface'
import { Usuario } from '../src/entities/usuario.entity'
import { IPublicacaoRepository } from '../src/repositories/publicacao.repository.interface'
import { CreatePublicacaoUseCase } from '../src/uses-cases/create-publicacao'
import { DeletePublicacaoUseCase } from '../src/uses-cases/delete-publicacao'
import { FindAllPublicacaoUseCase } from '../src/uses-cases/find-all-publicacao'
import { FindPublicacaoUseCase } from '../src/uses-cases/find-publicacao'
import { ResourceNotFoundError } from '../src/uses-cases/errors/resource-not-found'
import { SearchPublicacaoUseCase } from '../src/uses-cases/search-publicacao'
import { UpdatePublicacaoUseCase } from '../src/uses-cases/update-publicacao'

class InMemoryPublicacaoRepository implements IPublicacaoRepository {
  public items: IPublicacao[] = []

  async findAll(page: number, limit: number) {
    return this.items.slice((page - 1) * limit, page * limit)
  }

  async search(term: string) {
    const normalizedTerm = term.toLocaleLowerCase()
    return this.items.filter(
      ({ titulo, conteudo }) =>
        titulo.toLocaleLowerCase().includes(normalizedTerm) ||
        conteudo.toLocaleLowerCase().includes(normalizedTerm),
    )
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null
  }

  async create(publicacao: IPublicacao) {
    const created = { ...publicacao, id: publicacao.id ?? crypto.randomUUID() }
    this.items.push(created)
    return created
  }

  async update(publicacao: IPublicacao) {
    const index = this.items.findIndex((item) => item.id === publicacao.id)
    this.items[index] = publicacao
    return publicacao
  }

  async delete(id: string) {
    const initialLength = this.items.length
    this.items = this.items.filter((item) => item.id !== id)
    return this.items.length < initialLength
  }
}

const autor = { id: 1, nome: 'Docente', email: 'docente@escola.test' } as Usuario

function makePublicacao(overrides: Partial<IPublicacao> = {}): IPublicacao {
  return {
    id: 'post-1',
    titulo: 'Introdução ao Node.js',
    conteudo: 'Conteúdo da postagem',
    usuario: autor,
    ...overrides,
  }
}

describe('casos de uso de publicações', () => {
  let repository: InMemoryPublicacaoRepository

  beforeEach(() => {
    repository = new InMemoryPublicacaoRepository()
  })

  it('cria uma postagem', async () => {
    const result = await new CreatePublicacaoUseCase(repository).handler(
      makePublicacao(),
    )

    expect(result.titulo).toBe('Introdução ao Node.js')
    expect(repository.items).toHaveLength(1)
  })

  it('edita uma postagem existente', async () => {
    repository.items.push(makePublicacao())

    const result = await new UpdatePublicacaoUseCase(repository).handler(
      'post-1',
      makePublicacao({ titulo: 'Node.js atualizado' }),
    )

    expect(result.titulo).toBe('Node.js atualizado')
    expect(repository.items[0]?.titulo).toBe('Node.js atualizado')
  })

  it('recusa a edição de uma postagem inexistente', async () => {
    await expect(
      new UpdatePublicacaoUseCase(repository).handler(
        'inexistente',
        makePublicacao(),
      ),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('exclui uma postagem existente', async () => {
    repository.items.push(makePublicacao())

    await new DeletePublicacaoUseCase(repository).handler('post-1')

    expect(repository.items).toHaveLength(0)
  })

  it('recusa a exclusão de uma postagem inexistente', async () => {
    await expect(
      new DeletePublicacaoUseCase(repository).handler('inexistente'),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('localiza uma postagem por id', async () => {
    repository.items.push(makePublicacao())

    const result = await new FindPublicacaoUseCase(repository).handler('post-1')

    expect(result.id).toBe('post-1')
  })

  it('lista as postagens com paginação', async () => {
    repository.items.push(makePublicacao(), makePublicacao({ id: 'post-2' }))

    const result = await new FindAllPublicacaoUseCase(repository).handler(2, 1)

    expect(result.map(({ id }) => id)).toEqual(['post-2'])
  })

  it('busca postagens por título ou conteúdo', async () => {
    repository.items.push(
      makePublicacao(),
      makePublicacao({ id: 'post-2', titulo: 'PostgreSQL', conteudo: 'Banco' }),
    )

    const result = await new SearchPublicacaoUseCase(repository).handler('node')

    expect(result.map(({ id }) => id)).toEqual(['post-1'])
  })
})
