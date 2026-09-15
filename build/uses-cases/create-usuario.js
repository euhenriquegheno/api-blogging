"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuarioUseCase = void 0;
class CreateUsuarioUseCase {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    handler(usuario) {
        return this.usuarioRepository.create(usuario);
    }
}
exports.CreateUsuarioUseCase = CreateUsuarioUseCase;
//# sourceMappingURL=create-usuario.js.map