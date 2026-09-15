import { IUsuario } from '../../entities/models/usuario.interface';
import { IUsuarioRepository } from '../usuario.repository.interface';
export declare class UsuarioRepository implements IUsuarioRepository {
    private repository;
    constructor();
    create(usuario: IUsuario): Promise<IUsuario>;
    findAll(page: number, limit: number): Promise<IUsuario[]>;
    findById(id: number): Promise<IUsuario | null>;
    update(usuario: IUsuario): Promise<IUsuario>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=usuario.repository.d.ts.map