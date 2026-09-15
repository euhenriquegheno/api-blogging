"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
exports.initializeDataSource = initializeDataSource;
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
    synchronize: env_1.env.NODE_ENV === 'development',
    entities: [usuario_entity_1.Usuario, publicacao_entity_1.Publicacao],
});
async function initializeDataSource() {
    if (!exports.appDataSource.isInitialized) {
        await exports.appDataSource.initialize();
        console.log('Database with typeorm connected!');
    }
}
//# sourceMappingURL=typeorm.js.map