import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { configService } from './config/configService'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: configService.getValue('CLIENT_URL'),
    credentials: true,
  })
  app.use(cookieParser())

  const port = process.env.PORT || 3000
  await app.listen(port, () => {
    console.log(`Runs on port ${port}`)
  })
}
bootstrap()
