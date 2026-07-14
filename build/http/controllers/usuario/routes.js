"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoutes = usuarioRoutes;
const create_1 = require("./create");
const find_1 = require("./find");
const find_all_1 = require("./find-all");
const delete_1 = require("./delete");
const update_1 = require("./update");
const swagger_schemas_1 = require("../../swagger-schemas");
async function usuarioRoutes(app) {
    app.post('/user', {
        schema: {
            tags: ['Usuários'],
            summary: 'Cria um usuário',
            body: swagger_schemas_1.usuarioBodySchema,
            response: { 201: swagger_schemas_1.usuarioSchema },
        },
    }, create_1.create);
    app.get('/user/:id', {
        schema: {
            tags: ['Usuários'],
            summary: 'Obtém um usuário pelo ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'number' } },
            },
            response: { 200: swagger_schemas_1.usuarioSchema },
        },
    }, find_1.findUsuario);
    app.get('/user', {
        schema: {
            tags: ['Usuários'],
            summary: 'Lista usuários',
            querystring: {
                type: 'object',
                properties: {
                    page: { type: 'number', default: 1 },
                    limit: { type: 'number', default: 10 },
                },
            },
            response: { 200: { type: 'array', items: swagger_schemas_1.usuarioSchema } },
        },
    }, find_all_1.findAllUsuarios);
    app.delete('/user/:id', {
        schema: {
            tags: ['Usuários'],
            summary: 'Exclui um usuário',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'number' } },
            },
            response: { 204: { type: 'null' } },
        },
    }, delete_1.deleteUsuario);
    app.put('/user/:id', {
        schema: {
            tags: ['Usuários'],
            summary: 'Edita um usuário',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'number' } },
            },
            body: swagger_schemas_1.usuarioBodySchema,
            response: { 200: swagger_schemas_1.usuarioSchema },
        },
    }, update_1.update);
}
//# sourceMappingURL=routes.js.map