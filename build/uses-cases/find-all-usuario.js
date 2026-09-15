"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUsuarioUseCase = void 0;
class FindAllUsuarioUseCase {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async handler(page, limit) {
        const usuarios = await this.usuarioRepository.findAll(page, limit);
        return usuarios;
    }
}
exports.FindAllUsuarioUseCase = FindAllUsuarioUseCase;
//# sourceMappingURL=find-all-usuario.js.map