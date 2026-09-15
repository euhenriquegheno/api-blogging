import { IUsuarioRepository } from '../repositories/usuario.repository.interface';
export declare class FindUsuarioUseCase {
    private usuarioRepository;
    constructor(usuarioRepository: IUsuarioRepository);
    handler(id: number): Promise<import("../entities/models/usuario.interface").IUsuario>;
}
//# sourceMappingURL=find-usuario.d.ts.map