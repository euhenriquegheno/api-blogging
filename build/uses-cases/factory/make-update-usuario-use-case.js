"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateUsuarioUseCase = makeUpdateUsuarioUseCase;
const usuario_repository_1 = require("../../repositories/typeorm/usuario.repository");
const update_usuario_1 = require("../update-usuario");
function makeUpdateUsuarioUseCase() {
    const usuarioRepository = new usuario_repository_1.UsuarioRepository();
    const updateUsuarioUseCase = new update_usuario_1.UpdateUsuarioUseCase(usuarioRepository);
    return updateUsuarioUseCase;
}
//# sourceMappingURL=make-update-usuario-use-case.js.map