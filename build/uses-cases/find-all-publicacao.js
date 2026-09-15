"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllPublicacaoUseCase = void 0;
class FindAllPublicacaoUseCase {
    constructor(publicacaoRepository) {
        this.publicacaoRepository = publicacaoRepository;
    }
    async handler(page, limit) {
        const publicacoes = await this.publicacaoRepository.findAll(page, limit);
        return publicacoes;
    }
}
exports.FindAllPublicacaoUseCase = FindAllPublicacaoUseCase;
//# sourceMappingURL=find-all-publicacao.js.map