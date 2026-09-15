import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IUsuario } from './models/usuario.interface'

@Entity({
  name: 'usuario',
})
export class Usuario implements IUsuario {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number

  @Column({ name: 'email', type: 'varchar' })
  email!: string

  @Column({ name: 'senha', type: 'varchar' })
  senha!: string

  @Column({ name: 'nome', type: 'varchar' })
  nome!: string

  @Column({ name: 'cpf', type: 'varchar' })
  cpf!: string

  @Column({ name: 'tipo', type: 'int' })
  tipo!: number
}
