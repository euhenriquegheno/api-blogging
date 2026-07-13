"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublicacao = findPublicacao;
const zod_1 = __importDefault(require("zod"));
const make_find_publicacao_use_case_1 = require("../../../uses-cases/factory/make-find-publicacao-use-case");
async function findPublicacao(request, reply) {
    const registerParamsSchema = zod_1.default.object({
        id: zod_1.default.uuid(),
    });
    const { id } = registerParamsSchema.parse(request.params);
    const findPublicacaoUseCase = (0, make_find_publicacao_use_case_1.makeFindPublicacaoUseCase)();
    const publicacao = await findPublicacaoUseCase.handler(id);
    return reply.status(200).send(publicacao);
}
//# sourceMappingURL=find.js.map