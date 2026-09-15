"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreatePublicacaoUseCase = makeCreatePublicacaoUseCase;
const publicacao_repository_1 = require("../../repositories/typeorm/publicacao.repository");
const create_publicacao_1 = require("../create-publicacao");
function makeCreatePublicacaoUseCase() {
    const publicacaoRepository = new publicacao_repository_1.PublicacaoRepository();
    const createPublicacaoUseCase = new create_publicacao_1.CreatePublicacaoUseCase(publicacaoRepository);
    return createPublicacaoUseCase;
}
//# sourceMappingURL=make-create-publicacao-use-case.js.map