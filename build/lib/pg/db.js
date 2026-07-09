"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const pg_1 = require("pg");
const env_1 = require("../../env");
const CONFIG = {
    user: env_1.env.DATABASE_USER,
    host: env_1.env.DATABASE_HOST,
    database: env_1.env.DATABASE_NAME,
    password: env_1.env.DATABASE_PASSWORD,
    port: env_1.env.DATABASE_PORT,
};
class Database {
    constructor() {
        this.pool = new pg_1.Pool(CONFIG);
        this.connection();
    }
    async connection() {
        try {
            this.client = await this.pool.connect();
        }
        catch (error) {
            console.error(`Erro ao conectar ao banco de dados: ${error}`);
            throw new Error(`Erro ao conectar ao banco de dados: ${error}`);
        }
    }
    get clientInstance() {
        return this.client;
    }
}
exports.database = new Database();
//# sourceMappingURL=db.js.map