"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const zod_1 = __importDefault(require("zod"));
const make_create_usuario_use_case_1 = require("../../../uses-cases/factory/make-create-usuario-use-case");
const bcrypt_1 = require("bcrypt");
async function create(request, reply) {
    const registerBodySchema = zod_1.default.object({
        email: zod_1.default.string(),
        senha: zod_1.default.string(),
        nome: zod_1.default.string(),
        cpf: zod_1.default.string(),
        tipo: zod_1.default.coerce.number(),
    });
    const { email, senha, nome, cpf, tipo } = registerBodySchema.parse(request.body);
    const hashedPassword = await (0, bcrypt_1.hash)(senha, 8);
    const userWithHashedPassword = {
        email,
        senha: hashedPassword,
        nome,
        cpf,
        tipo,
    };
    const createPessoaUseCase = (0, make_create_usuario_use_case_1.makeCreateUsuarioUseCase)();
    const usuario = await createPessoaUseCase.handler(userWithHashedPassword);
    return reply.status(201).send({
        id: usuario?.id,
        email: usuario?.email,
        nome: usuario?.nome,
        cpf: usuario?.cpf,
        tipo: usuario?.tipo,
    });
}
//# sourceMappingURL=create.js.map