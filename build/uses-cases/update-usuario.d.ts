import { IUsuario } from '../entities/models/usuario.interface';
import { IUsuarioRepository } from '../repositories/usuario.repository.interface';
export declare class UpdateUsuarioUseCase {
    private usuarioRepository;
    constructor(usuarioRepository: IUsuarioRepository);
    handler(id: number, usuarioNew: IUsuario): Promise<IUsuario | undefined>;
}
//# sourceMappingURL=update-usuario.d.ts.map