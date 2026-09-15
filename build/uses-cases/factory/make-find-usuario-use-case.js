"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindUsuarioUseCase = makeFindUsuarioUseCase;
const usuario_repository_1 = require("../../repositories/typeorm/usuario.repository");
const find_usuario_1 = require("../find-usuario");
function makeFindUsuarioUseCase() {
    const usuarioRepository = new usuario_repository_1.UsuarioRepository();
    const findUsuarioUseCase = new find_usuario_1.FindUsuarioUseCase(usuarioRepository);
    return findUsuarioUseCase;
}
//# sourceMappingURL=make-find-usuario-use-case.js.map