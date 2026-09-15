"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const zod_1 = __importDefault(require("zod"));
const make_create_usuario_use_case_1 = require("../../../uses-cases/factory/make-create-usuario-use-case");
async function create(request, reply) {
    const registerBodySchema = zod_1.default.object({
        email: zod_1.default.string(),
        senha: zod_1.default.string(),
        nome: zod_1.default.string(),
        cpf: zod_1.default.string(),
        tipo: zod_1.default.coerce.number(),
    });
    const { email, senha, nome, cpf, tipo } = registerBodySchema.parse(request.body);
    const createPessoaUseCase = (0, make_create_usuario_use_case_1.makeCreateUsuarioUseCase)();
    const pessoa = await createPessoaUseCase.handler({
        email,
        senha,
        nome,
        cpf,
        tipo,
    });
    return reply.status(201).send(pessoa);
}
//# sourceMappingURL=create.js.map