import { IUsuario } from '../entities/models/usuario.interface'

export interface IUsuarioRepository {
  create(pessoa: IUsuario): Promise<IUsuario | undefined>
}
