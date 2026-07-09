"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacaoRepository = void 0;
const publicacao_entity_1 = require("../../entities/publicacao.entity");
const typeorm_1 = require("../../lib/typeorm/typeorm");
class PublicacaoRepository {
    constructor() {
        this.repository = typeorm_1.appDataSource.getRepository(publicacao_entity_1.Publicacao);
    }
    async findAll(page, limit) {
        return this.repository.find({
            select: {
                id: true,
                titulo: true,
                conteudo: true,
                usuario: {
                    id: true,
                    nome: true,
                    email: true,
                },
            },
            relations: { usuario: true },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async findById(id) {
        return this.repository.findOne({
            select: {
                id: true,
                titulo: true,
                conteudo: true,
                usuario: {
                    id: true,
                    nome: true,
                    email: true,
                },
            },
            relations: { usuario: true },
            where: { id },
        });
    }
    async create(publicacao) {
        return this.repository.save(publicacao);
    }
    update(publicacao) {
        return this.repository.save(publicacao);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
exports.PublicacaoRepository = PublicacaoRepository;
//# sourceMappingURL=publicacao.repository.js.map