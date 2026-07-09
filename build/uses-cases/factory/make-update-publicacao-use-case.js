"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdatePublicacaoUseCase = makeUpdatePublicacaoUseCase;
const publicacao_repository_1 = require("../../repositories/typeorm/publicacao.repository");
const update_publicacao_1 = require("../update-publicacao");
function makeUpdatePublicacaoUseCase() {
    const publicacaoRepository = new publicacao_repository_1.PublicacaoRepository();
    const updatePublicacaoUseCase = new update_publicacao_1.UpdatePublicacaoUseCase(publicacaoRepository);
    return updatePublicacaoUseCase;
}
//# sourceMappingURL=make-update-publicacao-use-case.js.map