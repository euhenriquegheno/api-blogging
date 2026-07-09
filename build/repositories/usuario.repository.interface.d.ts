import { IUsuario } from '../entities/models/usuario.interface';
export interface IUsuarioRepository {
    create(pessoa: IUsuario): Promise<IUsuario | undefined>;
}
//# sourceMappingURL=usuario.repository.interface.d.ts.map