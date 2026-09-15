"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteUsuarioUseCase = makeDeleteUsuarioUseCase;
const usuario_repository_1 = require("../../repositories/typeorm/usuario.repository");
const delete_usuario_1 = require("../delete-usuario");
function makeDeleteUsuarioUseCase() {
    const usuarioRepository = new usuario_repository_1.UsuarioRepository();
    const deleteUsuarioUseCase = new delete_usuario_1.DeleteUsuarioUseCase(usuarioRepository);
    return deleteUsuarioUseCase;
}
//# sourceMappingURL=make-delete-usuario-use-case.js.map