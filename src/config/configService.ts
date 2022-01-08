import * as dotenv from 'dotenv'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as path from 'path'

dotenv.config()

export class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  public getValue(key: string): string {
    const param = this.env[key]
    if (!param) {
      throw new Error(`Missing config .env parameter - ${key}`)
    }

    return param
  }

  public ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key))
    return this
  }

  public getPort() {
    return this.getValue('PORT')
  }

  public isProduction() {
    const mode = this.getValue('MODE')
    return mode != 'DEV'
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const migrations = this.isProduction()
      ? path.join(__dirname, '..', 'migration', '*.js')
      : path.join(__dirname, '..', 'migration', '*.ts')
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: [path.join(__dirname, '..', 'model', '*.entity{.ts,.js}')],

      migrationsTableName: 'migration',

      migrations: [migrations],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    }
  }
}

export const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
])
