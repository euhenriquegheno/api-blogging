import { IUsuario } from '../../entities/models/usuario.interface';
import { IUsuarioRepository } from '../usuario.repository.interface';
export declare class UsuarioRepository implements IUsuarioRepository {
    create({ email, senha, nome, cpf, tipo, }: IUsuario): Promise<IUsuario | undefined>;
}
//# sourceMappingURL=usuario.repository.d.ts.map