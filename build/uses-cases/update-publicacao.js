"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePublicacaoUseCase = void 0;
const resource_not_found_1 = require("./errors/resource-not-found");
class UpdatePublicacaoUseCase {
    constructor(publicacaoRepository) {
        this.publicacaoRepository = publicacaoRepository;
    }
    async handler(id, publicacaoNew) {
        const publicacaoOld = await this.publicacaoRepository.findById(id);
        if (!publicacaoOld) {
            throw new resource_not_found_1.ResourceNotFoundError('Publicação não encontrada');
        }
        return this.publicacaoRepository.update({
            ...publicacaoOld,
            ...publicacaoNew,
            id,
        });
    }
}
exports.UpdatePublicacaoUseCase = UpdatePublicacaoUseCase;
//# sourceMappingURL=update-publicacao.js.map