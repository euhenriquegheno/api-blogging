import { IPessoa } from './models/pessoa.interface'

export class Pessoa implements IPessoa {
  id?: number
  usuario_id?: number
  nome: string
  cpf: string
  tipo: number

  constructor(nome: string, cpf: string, tipo: number) {
    this.nome = nome
    this.cpf = cpf
    this.tipo = tipo
  }
}
