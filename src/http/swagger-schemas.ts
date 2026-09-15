export const usuarioSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    email: { type: 'string' },
    nome: { type: 'string' },
    cpf: { type: 'string' },
    tipo: { type: 'number' },
  },
}

export const publicacaoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'UUID da postagem' },
    titulo: { type: 'string' },
    conteudo: { type: 'string' },
    usuario: usuarioSchema,
  },
}

export const publicacaoBodySchema = {
  type: 'object',
  required: ['titulo', 'conteudo', 'usuario_id'],
  properties: {
    titulo: { type: 'string' },
    conteudo: { type: 'string' },
    usuario_id: { type: 'number', description: 'ID do docente autor' },
  },
}

export const usuarioBodySchema = {
  type: 'object',
  required: ['email', 'senha', 'nome', 'cpf', 'tipo'],
  properties: {
    email: { type: 'string' },
    senha: { type: 'string', format: 'password' },
    nome: { type: 'string' },
    cpf: { type: 'string' },
    tipo: { type: 'number' },
  },
}
