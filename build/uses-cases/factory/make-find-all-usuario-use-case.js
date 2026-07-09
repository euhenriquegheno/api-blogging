"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindAllUsuarioUseCase = makeFindAllUsuarioUseCase;
const usuario_repository_1 = require("../../repositories/typeorm/usuario.repository");
const find_all_usuario_1 = require("../find-all-usuario");
function makeFindAllUsuarioUseCase() {
    const usuarioRepository = new usuario_repository_1.UsuarioRepository();
    const findAllUsuarioUseCase = new find_all_usuario_1.FindAllUsuarioUseCase(usuarioRepository);
    return findAllUsuarioUseCase;
}
//# sourceMappingURL=make-find-all-usuario-use-case.js.map