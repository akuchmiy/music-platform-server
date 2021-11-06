import * as dotenv from 'dotenv'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

dotenv.config()

export class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const param = this.env[key]
    if (!param && throwOnMissing) {
      throw new Error(`Missing config .env parameter - ${key}`)
    }

    return param
  }

  public ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key, true))
    return this
  }

  public getPort() {
    return this.getValue('PORT', true)
  }

  public isProduction() {
    const mode = this.getValue('MODE', false)
    return mode != 'DEV'
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

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
