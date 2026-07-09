"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePublicacaoUseCase = void 0;
const resource_not_found_1 = require("./errors/resource-not-found");
class DeletePublicacaoUseCase {
    constructor(publicacaoRepository) {
        this.publicacaoRepository = publicacaoRepository;
    }
    async handler(id) {
        const deleted = await this.publicacaoRepository.delete(id);
        if (!deleted) {
            throw new resource_not_found_1.ResourceNotFoundError('Publicação não encontrada');
        }
    }
}
exports.DeletePublicacaoUseCase = DeletePublicacaoUseCase;
//# sourceMappingURL=delete-publicacao.js.map