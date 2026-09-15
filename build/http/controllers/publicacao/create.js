"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const zod_1 = __importDefault(require("zod"));
const make_create_publicacao_use_case_1 = require("../../../uses-cases/factory/make-create-publicacao-use-case");
async function create(request, reply) {
    const registerBodySchema = zod_1.default.object({
        titulo: zod_1.default.string(),
        conteudo: zod_1.default.string(),
        usuario_id: zod_1.default.coerce.number(),
    });
    const { titulo, conteudo, usuario_id } = registerBodySchema.parse(request.body);
    const createPublicacaoUseCase = (0, make_create_publicacao_use_case_1.makeCreatePublicacaoUseCase)();
    const publicacao = await createPublicacaoUseCase.handler({
        titulo,
        conteudo,
        usuario: {
            id: usuario_id,
        },
    });
    return reply.status(201).send(publicacao);
}
//# sourceMappingURL=create.js.map