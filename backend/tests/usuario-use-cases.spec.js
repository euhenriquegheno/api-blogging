const bcrypt = require('bcrypt')
const {
  AuthenticateUseCase,
} = require('../build/uses-cases/authenticate')
const {
  InvalidCredentialsError,
} = require('../build/uses-cases/errors/invalid-credentials-error')

class InMemoryUsuarioRepository {
  usuarios = []

  async create(usuario) {
    this.usuarios.push(usuario)
    return usuario
  }

  async findAll() {
    return this.usuarios
  }

  async findById(id) {
    return this.usuarios.find((usuario) => usuario.id === id) ?? null
  }

  async findByEmail(email) {
    return this.usuarios.find((usuario) => usuario.email === email) ?? null
  }

  async update(usuario) {
    const index = this.usuarios.findIndex((item) => item.id === usuario.id)
    this.usuarios[index] = usuario
    return usuario
  }

  async delete(id) {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id)

    if (index === -1) {
      return false
    }

    this.usuarios.splice(index, 1)
    return true
  }
}

async function makeUsuario(overrides = {}) {
  const senhaHash = await bcrypt.hash('senha-correta', 8)

  return {
    id: 1,
    email: 'professor@example.com',
    senha: senhaHash,
    nome: 'Professor Teste',
    cpf: '12345678900',
    tipo: 2,
    ...overrides,
  }
}

describe('Authenticate use case', () => {
  it('returns the user when the email exists and the plain password matches the stored bcrypt hash', async () => {
    const repository = new InMemoryUsuarioRepository()
    const usuario = await makeUsuario()
    repository.usuarios.push(usuario)
    const useCase = new AuthenticateUseCase(repository)

    const authenticated = await useCase.handler(
      'professor@example.com',
      'senha-correta',
    )

    expect(authenticated).toEqual(usuario)
  })

  it('rejects with InvalidCredentialsError when the email does not exist', async () => {
    const repository = new InMemoryUsuarioRepository()
    const useCase = new AuthenticateUseCase(repository)

    await expect(
      useCase.handler('nao-existe@example.com', 'qualquer-senha'),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('rejects with InvalidCredentialsError when the password does not match', async () => {
    const repository = new InMemoryUsuarioRepository()
    const usuario = await makeUsuario()
    repository.usuarios.push(usuario)
    const useCase = new AuthenticateUseCase(repository)

    await expect(
      useCase.handler('professor@example.com', 'senha-errada'),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
