"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPublicacaoUseCase = void 0;
const resource_not_found_1 = require("./errors/resource-not-found");
class FindPublicacaoUseCase {
    constructor(publicacaoRepository) {
        this.publicacaoRepository = publicacaoRepository;
    }
    async handler(id) {
        const product = await this.publicacaoRepository.findById(id);
        if (!product) {
            throw new resource_not_found_1.ResourceNotFoundError('Publicação não encontrada');
        }
        return product;
    }
}
exports.FindPublicacaoUseCase = FindPublicacaoUseCase;
//# sourceMappingURL=find-publicacao.js.map