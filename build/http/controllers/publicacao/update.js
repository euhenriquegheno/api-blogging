"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
const zod_1 = __importDefault(require("zod"));
const make_update_publicacao_use_case_1 = require("../../../uses-cases/factory/make-update-publicacao-use-case");
async function update(request, reply) {
    const registerParamsSchema = zod_1.default.object({
        id: zod_1.default.uuid(),
    });
    const { id } = registerParamsSchema.parse(request.params);
    const registerBodySchema = zod_1.default.object({
        titulo: zod_1.default.string(),
        conteudo: zod_1.default.string(),
        usuario_id: zod_1.default.coerce.number(),
    });
    const { titulo, conteudo, usuario_id } = registerBodySchema.parse(request.body);
    const updatePublicacaoUseCase = (0, make_update_publicacao_use_case_1.makeUpdatePublicacaoUseCase)();
    const publicacao = await updatePublicacaoUseCase.handler(id, {
        titulo,
        conteudo,
        usuario: {
            id: usuario_id,
        },
    });
    return reply.status(200).send(publicacao);
}
//# sourceMappingURL=update.js.map