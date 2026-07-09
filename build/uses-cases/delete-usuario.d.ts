import { IUsuarioRepository } from '../repositories/usuario.repository.interface';
export declare class DeleteUsuarioUseCase {
    private usuarioRepository;
    constructor(usuarioRepository: IUsuarioRepository);
    handler(id: number): Promise<void>;
}
//# sourceMappingURL=delete-usuario.d.ts.map