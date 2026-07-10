"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPublicacaoUseCase = void 0;
class SearchPublicacaoUseCase {
    constructor(publicacaoRepository) {
        this.publicacaoRepository = publicacaoRepository;
    }
    async handler(term) {
        return this.publicacaoRepository.search(term);
    }
}
exports.SearchPublicacaoUseCase = SearchPublicacaoUseCase;
//# sourceMappingURL=search-publicacao.js.map