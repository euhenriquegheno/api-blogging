import { IUsuario } from '../entities/models/usuario.interface';
import { IUsuarioRepository } from '../repositories/usuario.repository.interface';
export declare class CreateUsuarioUseCase {
    private usuarioRepository;
    constructor(usuarioRepository: IUsuarioRepository);
    handler(usuario: IUsuario): Promise<IUsuario | undefined>;
}
//# sourceMappingURL=create-usuario.d.ts.map