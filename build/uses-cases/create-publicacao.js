"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePublicacaoUseCase = void 0;
class CreatePublicacaoUseCase {
    constructor(publicacaoRepository) {
        this.publicacaoRepository = publicacaoRepository;
    }
    async handler(publicacao) {
        return this.publicacaoRepository.create(publicacao);
    }
}
exports.CreatePublicacaoUseCase = CreatePublicacaoUseCase;
//# sourceMappingURL=create-publicacao.js.map