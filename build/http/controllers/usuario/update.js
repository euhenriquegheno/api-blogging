"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
const zod_1 = __importDefault(require("zod"));
const make_update_usuario_use_case_1 = require("../../../uses-cases/factory/make-update-usuario-use-case");
async function update(request, reply) {
    const registerParamsSchema = zod_1.default.object({
        id: zod_1.default.coerce.number().int(),
    });
    const { id } = registerParamsSchema.parse(request.params);
    const registerBodySchema = zod_1.default.object({
        email: zod_1.default.string(),
        nome: zod_1.default.string(),
        senha: zod_1.default.string(),
        cpf: zod_1.default.string(),
        tipo: zod_1.default.number().int(),
    });
    const { email, nome, senha, cpf, tipo } = registerBodySchema.parse(request.body);
    const updateUsuarioUseCase = (0, make_update_usuario_use_case_1.makeUpdateUsuarioUseCase)();
    const usuario = await updateUsuarioUseCase.handler(id, {
        email,
        nome,
        senha,
        cpf,
        tipo,
    });
    return reply.status(200).send(usuario);
}
//# sourceMappingURL=update.js.map