"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindAllPublicacaoUseCase = makeFindAllPublicacaoUseCase;
const publicacao_repository_1 = require("../../repositories/typeorm/publicacao.repository");
const find_all_publicacao_1 = require("../find-all-publicacao");
function makeFindAllPublicacaoUseCase() {
    const publicacaoRepository = new publicacao_repository_1.PublicacaoRepository();
    const findAllPublicacaoUseCase = new find_all_publicacao_1.FindAllPublicacaoUseCase(publicacaoRepository);
    return findAllPublicacaoUseCase;
}
//# sourceMappingURL=make-find-all-publicacao-use-case.js.map