"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const db_1 = require("../../lib/pg/db");
class UsuarioRepository {
    async create({ email, senha, nome, cpf, tipo, }) {
        const result = await db_1.database.clientInstance?.query('INSERT INTO usuario (email, senha, nome, cpf, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *', [email, senha, nome, cpf, tipo]);
        return result?.rows[0];
    }
}
exports.UsuarioRepository = UsuarioRepository;
//# sourceMappingURL=usuario.repository.js.map