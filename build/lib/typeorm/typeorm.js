"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("../../env");
const usuario_entity_1 = require("../../entities/usuario.entity");
const publicacao_entity_1 = require("../../entities/publicacao.entity");
exports.appDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_1.env.DATABASE_HOST,
    port: env_1.env.DATABASE_PORT,
    username: env_1.env.DATABASE_USER,
    password: env_1.env.DATABASE_PASSWORD,
    database: env_1.env.DATABASE_NAME,
    logging: env_1.env.NODE_ENV === 'development',
    entities: [usuario_entity_1.Usuario, publicacao_entity_1.Publicacao],
});
exports.appDataSource
    .initialize()
    .then(() => {
    console.log('Database with typeorm connected!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
//# sourceMappingURL=typeorm.js.map