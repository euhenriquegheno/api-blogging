"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPublicacao = findAllPublicacao;
const zod_1 = __importDefault(require("zod"));
const make_find_all_publicacao_use_case_1 = require("../../../uses-cases/factory/make-find-all-publicacao-use-case");
async function findAllPublicacao(request, reply) {
    const registerQuerySchema = zod_1.default.object({
        page: zod_1.default.coerce.number().int().positive().default(1),
        limit: zod_1.default.coerce.number().int().positive().max(100).default(10),
    });
    const { page, limit } = registerQuerySchema.parse(request.query);
    const findAllPublicacaoUseCase = (0, make_find_all_publicacao_use_case_1.makeFindAllPublicacaoUseCase)();
    const publicacoes = await findAllPublicacaoUseCase.handler(page, limit);
    return reply.status(200).send(publicacoes);
}
//# sourceMappingURL=find-all.js.map