"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const routes_1 = require("./http/controllers/usuario/routes");
const routes_2 = require("./http/controllers/publicacao/routes");
const global_error_handler_1 = require("./utils/global-error-handler");
exports.app = (0, fastify_1.default)();
exports.app.register(swagger_1.default, {
    openapi: {
        info: {
            title: 'API Blogging',
            description: 'API REST para uma plataforma educacional de publicações.',
            version: '1.0.0',
        },
        tags: [
            { name: 'Posts', description: 'Operações com postagens' },
            { name: 'Usuários', description: 'Operações com docentes e usuários' },
        ],
    },
});
exports.app.register(routes_1.usuarioRoutes);
exports.app.register(routes_2.publicacaoRoutes);
exports.app.register(swagger_ui_1.default, {
    routePrefix: '/docs',
});
exports.app.setErrorHandler(global_error_handler_1.globalErrorHandler);
//# sourceMappingURL=app.js.map