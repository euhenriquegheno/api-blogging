import { IUsuarioRepository } from '../repositories/usuario.repository.interface';
export declare class FindAllUsuarioUseCase {
    private usuarioRepository;
    constructor(usuarioRepository: IUsuarioRepository);
    handler(page: number, limit: number): Promise<import("../entities/models/usuario.interface").IUsuario[] | undefined>;
}
//# sourceMappingURL=find-all-usuario.d.ts.map