"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsuarioUseCase = void 0;
const resource_not_found_1 = require("./errors/resource-not-found");
class UpdateUsuarioUseCase {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async handler(id, usuarioNew) {
        const usuarioOld = await this.usuarioRepository.findById(id);
        if (!usuarioOld) {
            throw new resource_not_found_1.ResourceNotFoundError('Usuário não encontrado');
        }
        return this.usuarioRepository.update({
            ...usuarioOld,
            ...usuarioNew,
            id,
        });
    }
}
exports.UpdateUsuarioUseCase = UpdateUsuarioUseCase;
//# sourceMappingURL=update-usuario.js.map