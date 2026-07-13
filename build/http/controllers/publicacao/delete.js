"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePublicacao = deletePublicacao;
const make_delete_publicacao_use_case_1 = require("../../../uses-cases/factory/make-delete-publicacao-use-case");
const zod_1 = __importDefault(require("zod"));
async function deletePublicacao(request, reply) {
    const registerParamsSchema = zod_1.default.object({
        id: zod_1.default.uuid(),
    });
    const { id } = registerParamsSchema.parse(request.params);
    const deletePublicacaoUseCase = (0, make_delete_publicacao_use_case_1.makeDeletePublicacaoUseCase)();
    await deletePublicacaoUseCase.handler(id);
    return reply.status(204).send();
}
//# sourceMappingURL=delete.js.map