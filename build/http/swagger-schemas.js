"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioBodySchema = exports.publicacaoBodySchema = exports.publicacaoSchema = exports.usuarioSchema = void 0;
exports.usuarioSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        nome: { type: 'string' },
        cpf: { type: 'string' },
        tipo: { type: 'number' },
    },
};
exports.publicacaoSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', description: 'UUID da postagem' },
        titulo: { type: 'string' },
        conteudo: { type: 'string' },
        usuario: exports.usuarioSchema,
    },
};
exports.publicacaoBodySchema = {
    type: 'object',
    required: ['titulo', 'conteudo', 'usuario_id'],
    properties: {
        titulo: { type: 'string' },
        conteudo: { type: 'string' },
        usuario_id: { type: 'number', description: 'ID do docente autor' },
    },
};
exports.usuarioBodySchema = {
    type: 'object',
    required: ['email', 'senha', 'nome', 'cpf', 'tipo'],
    properties: {
        email: { type: 'string' },
        senha: { type: 'string', format: 'password' },
        nome: { type: 'string' },
        cpf: { type: 'string' },
        tipo: { type: 'number' },
    },
};
//# sourceMappingURL=swagger-schemas.js.map