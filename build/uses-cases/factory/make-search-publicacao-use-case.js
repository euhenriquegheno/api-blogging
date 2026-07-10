"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSearchPublicacaoUseCase = makeSearchPublicacaoUseCase;
const publicacao_repository_1 = require("../../repositories/typeorm/publicacao.repository");
const search_publicacao_1 = require("../search-publicacao");
function makeSearchPublicacaoUseCase() {
    const publicacaoRepository = new publicacao_repository_1.PublicacaoRepository();
    return new search_publicacao_1.SearchPublicacaoUseCase(publicacaoRepository);
}
//# sourceMappingURL=make-search-publicacao-use-case.js.map