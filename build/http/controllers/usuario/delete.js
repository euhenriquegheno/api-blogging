"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = deleteUsuario;
const zod_1 = __importDefault(require("zod"));
const make_delete_usuario_use_case_1 = require("../../../uses-cases/factory/make-delete-usuario-use-case");
async function deleteUsuario(request, reply) {
    const registerParamsSchema = zod_1.default.object({
        id: zod_1.default.coerce.number(),
    });
    const { id } = registerParamsSchema.parse(request.params);
    const deleteUsuarioUseCase = (0, make_delete_usuario_use_case_1.makeDeleteUsuarioUseCase)();
    await deleteUsuarioUseCase.handler(id);
    return reply.status(204).send();
}
//# sourceMappingURL=delete.js.map