const { CreatePublicacaoUseCase } = require('../build/uses-cases/create-publicacao')
const { DeletePublicacaoUseCase } = require('../build/uses-cases/delete-publicacao')
const { ResourceNotFoundError } = require('../build/uses-cases/errors/resource-not-found')
const { UpdatePublicacaoUseCase } = require('../build/uses-cases/update-publicacao')

class InMemoryPublicacaoRepository {
  publicacoes = []

  async findAll() {
    return this.publicacoes
  }

  async search() {
    return this.publicacoes
  }

  async findById(id) {
    return this.publicacoes.find((publicacao) => publicacao.id === id) ?? null
  }

  async create(publicacao) {
    this.publicacoes.push(publicacao)
    return publicacao
  }

  async update(publicacao) {
    const index = this.publicacoes.findIndex((item) => item.id === publicacao.id)
    this.publicacoes[index] = publicacao
    return publicacao
  }

  async delete(id) {
    const index = this.publicacoes.findIndex((publicacao) => publicacao.id === id)

    if (index === -1) {
      return false
    }

    this.publicacoes.splice(index, 1)
    return true
  }
}

const usuario = { id: 1 }

function makePublicacao(id = 'post-1') {
  return {
    id,
    titulo: 'Título original',
    conteudo: 'Conteúdo original',
    usuario,
  }
}

describe('Publicacao use cases', () => {
  it('creates a post', async () => {
    const repository = new InMemoryPublicacaoRepository()
    const useCase = new CreatePublicacaoUseCase(repository)
    const publicacao = makePublicacao()

    const created = await useCase.handler(publicacao)

    expect(created).toEqual(publicacao)
    expect(repository.publicacoes).toContainEqual(publicacao)
  })

  it('updates an existing post and preserves its id', async () => {
    const repository = new InMemoryPublicacaoRepository()
    repository.publicacoes.push(makePublicacao())
    const useCase = new UpdatePublicacaoUseCase(repository)

    const updated = await useCase.handler('post-1', {
      titulo: 'Novo título',
      conteudo: 'Novo conteúdo',
      usuario,
    })

    expect(updated).toMatchObject({
      id: 'post-1',
      titulo: 'Novo título',
      conteudo: 'Novo conteúdo',
    })
  })

  it('does not update a post that does not exist', async () => {
    const useCase = new UpdatePublicacaoUseCase(
      new InMemoryPublicacaoRepository(),
    )

    await expect(useCase.handler('missing', makePublicacao())).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('deletes an existing post', async () => {
    const repository = new InMemoryPublicacaoRepository()
    repository.publicacoes.push(makePublicacao())
    const useCase = new DeletePublicacaoUseCase(repository)

    await useCase.handler('post-1')

    expect(repository.publicacoes).toHaveLength(0)
  })

  it('does not delete a post that does not exist', async () => {
    const useCase = new DeletePublicacaoUseCase(
      new InMemoryPublicacaoRepository(),
    )

    await expect(useCase.handler('missing')).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
