"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicacaoRoutes = publicacaoRoutes;
const create_1 = require("./create");
const find_1 = require("./find");
const find_all_1 = require("./find-all");
const delete_1 = require("./delete");
const update_1 = require("./update");
const search_1 = require("./search");
const swagger_schemas_1 = require("../../swagger-schemas");
async function publicacaoRoutes(app) {
    app.get('/posts/search', {
        schema: {
            tags: ['Posts'],
            summary: 'Busca postagens por título ou conteúdo',
            querystring: {
                type: 'object',
                required: ['q'],
                properties: { q: { type: 'string' } },
            },
            response: { 200: { type: 'array', items: swagger_schemas_1.publicacaoSchema } },
        },
    }, search_1.searchPublicacoes);
    app.get('/posts', {
        schema: {
            tags: ['Posts'],
            summary: 'Lista postagens',
            querystring: {
                type: 'object',
                properties: {
                    page: { type: 'number', default: 1 },
                    limit: { type: 'number', default: 10 },
                },
            },
            response: { 200: { type: 'array', items: swagger_schemas_1.publicacaoSchema } },
        },
    }, find_all_1.findAllPublicacao);
    app.get('/posts/:id', {
        schema: {
            tags: ['Posts'],
            summary: 'Obtém uma postagem pelo ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'string' } },
            },
            response: { 200: swagger_schemas_1.publicacaoSchema },
        },
    }, find_1.findPublicacao);
    app.post('/posts', {
        schema: {
            tags: ['Posts'],
            summary: 'Cria uma postagem',
            body: swagger_schemas_1.publicacaoBodySchema,
            response: { 201: swagger_schemas_1.publicacaoSchema },
        },
    }, create_1.create);
    app.put('/posts/:id', {
        schema: {
            tags: ['Posts'],
            summary: 'Edita uma postagem',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'string' } },
            },
            body: swagger_schemas_1.publicacaoBodySchema,
            response: { 200: swagger_schemas_1.publicacaoSchema },
        },
    }, update_1.update);
    app.delete('/posts/:id', {
        schema: {
            tags: ['Posts'],
            summary: 'Exclui uma postagem',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'string' } },
            },
            response: { 204: { type: 'null' } },
        },
    }, delete_1.deletePublicacao);
}
//# sourceMappingURL=routes.js.map