"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateUsuarioUseCase = makeCreateUsuarioUseCase;
const usuario_repository_1 = require("../../repositories/pg/usuario.repository");
const create_usuario_1 = require("../create-usuario");
function makeCreateUsuarioUseCase() {
    const usuarioRepository = new usuario_repository_1.UsuarioRepository();
    const createUsuarioUseCase = new create_usuario_1.CreateUsuarioUseCase(usuarioRepository);
    return createUsuarioUseCase;
}
//# sourceMappingURL=make-create-usuario-use-case.js.map