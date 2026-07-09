import { DataSource } from 'typeorm'

import { env } from '../../env'
import { Usuario } from '../../entities/usuario.entity'
import { Publicacao } from '../../entities/publicacao.entity'

export const appDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  logging: env.NODE_ENV === 'development',
  entities: [Usuario, Publicacao],
})

appDataSource
  .initialize()
  .then(() => {
    console.log('Database with typeorm connected!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
