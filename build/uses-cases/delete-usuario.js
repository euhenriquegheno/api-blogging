"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUsuarioUseCase = void 0;
const resource_not_found_1 = require("./errors/resource-not-found");
class DeleteUsuarioUseCase {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async handler(id) {
        const deleted = await this.usuarioRepository.delete(id);
        if (!deleted) {
            throw new resource_not_found_1.ResourceNotFoundError('Usuário não encontrado');
        }
    }
}
exports.DeleteUsuarioUseCase = DeleteUsuarioUseCase;
//# sourceMappingURL=delete-usuario.js.map