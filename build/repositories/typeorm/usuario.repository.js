"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const usuario_entity_1 = require("../../entities/usuario.entity");
const typeorm_1 = require("../../lib/typeorm/typeorm");
class UsuarioRepository {
    constructor() {
        this.repository = typeorm_1.appDataSource.getRepository(usuario_entity_1.Usuario);
    }
    async create(usuario) {
        return this.repository.save(usuario);
    }
    async findAll(page, limit) {
        return this.repository.find({
            select: {
                id: true,
                email: true,
                nome: true,
                cpf: true,
                tipo: true,
            },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async findById(id) {
        return this.repository.findOne({
            select: {
                id: true,
                email: true,
                nome: true,
                cpf: true,
                tipo: true,
            },
            where: { id },
        });
    }
    update(usuario) {
        return this.repository.save(usuario);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
exports.UsuarioRepository = UsuarioRepository;
//# sourceMappingURL=usuario.repository.js.map