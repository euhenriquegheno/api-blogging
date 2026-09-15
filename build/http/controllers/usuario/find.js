"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsuario = findUsuario;
const zod_1 = __importDefault(require("zod"));
const make_find_usuario_use_case_1 = require("../../../uses-cases/factory/make-find-usuario-use-case");
async function findUsuario(request, reply) {
    const registerParamsSchema = zod_1.default.object({
        id: zod_1.default.coerce.number(),
    });
    const { id } = registerParamsSchema.parse(request.params);
    const findUsuarioUseCase = (0, make_find_usuario_use_case_1.makeFindUsuarioUseCase)();
    const usuario = await findUsuarioUseCase.handler(id);
    return reply.status(200).send(usuario);
}
//# sourceMappingURL=find.js.map