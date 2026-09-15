"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPublicacoes = searchPublicacoes;
const zod_1 = __importDefault(require("zod"));
const make_search_publicacao_use_case_1 = require("../../../uses-cases/factory/make-search-publicacao-use-case");
async function searchPublicacoes(request, reply) {
    const searchQuerySchema = zod_1.default.object({
        q: zod_1.default.string().trim().min(1),
    });
    const { q } = searchQuerySchema.parse(request.query);
    const searchPublicacaoUseCase = (0, make_search_publicacao_use_case_1.makeSearchPublicacaoUseCase)();
    const publicacoes = await searchPublicacaoUseCase.handler(q);
    return reply.status(200).send(publicacoes);
}
//# sourceMappingURL=search.js.map