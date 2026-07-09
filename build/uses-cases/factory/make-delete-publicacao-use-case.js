"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeletePublicacaoUseCase = makeDeletePublicacaoUseCase;
const publicacao_repository_1 = require("../../repositories/typeorm/publicacao.repository");
const delete_publicacao_1 = require("../delete-publicacao");
function makeDeletePublicacaoUseCase() {
    const publicacaoRepository = new publicacao_repository_1.PublicacaoRepository();
    const deletePublicacaoUseCase = new delete_publicacao_1.DeletePublicacaoUseCase(publicacaoRepository);
    return deletePublicacaoUseCase;
}
//# sourceMappingURL=make-delete-publicacao-use-case.js.map