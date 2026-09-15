"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUsuarioUseCase = void 0;
const resource_not_found_1 = require("./errors/resource-not-found");
class FindUsuarioUseCase {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async handler(id) {
        const usuario = await this.usuarioRepository.findById(id);
        if (!usuario) {
            throw new resource_not_found_1.ResourceNotFoundError('Usuário não encontrado');
        }
        return usuario;
    }
}
exports.FindUsuarioUseCase = FindUsuarioUseCase;
//# sourceMappingURL=find-usuario.js.map