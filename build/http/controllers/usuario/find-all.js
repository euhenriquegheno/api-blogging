"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsuarios = findAllUsuarios;
const zod_1 = __importDefault(require("zod"));
const make_find_all_usuario_use_case_1 = require("../../../uses-cases/factory/make-find-all-usuario-use-case");
async function findAllUsuarios(request, reply) {
    const registerQuerySchema = zod_1.default.object({
        page: zod_1.default.coerce.number().default(1),
        limit: zod_1.default.coerce.number().default(10),
    });
    const { page, limit } = registerQuerySchema.parse(request.query);
    const findAllUsuariosUseCase = (0, make_find_all_usuario_use_case_1.makeFindAllUsuarioUseCase)();
    const usuarios = await findAllUsuariosUseCase.handler(page, limit);
    return reply.status(200).send(usuarios);
}
//# sourceMappingURL=find-all.js.map