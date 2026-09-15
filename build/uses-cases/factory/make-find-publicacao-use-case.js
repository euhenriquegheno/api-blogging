"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPublicacaoUseCase = makeFindPublicacaoUseCase;
const publicacao_repository_1 = require("../../repositories/typeorm/publicacao.repository");
const find_publicacao_1 = require("../find-publicacao");
function makeFindPublicacaoUseCase() {
    const publicacaoRepository = new publicacao_repository_1.PublicacaoRepository();
    const findPublicacaoUseCase = new find_publicacao_1.FindPublicacaoUseCase(publicacaoRepository);
    return findPublicacaoUseCase;
}
//# sourceMappingURL=make-find-publicacao-use-case.js.map