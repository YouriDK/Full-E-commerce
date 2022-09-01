import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as bodyParser from 'body-parser';
import path from 'path';
config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // ! Nest JS Link PRODUCTION
  if (process.env.PRODUCTION) {
    app.useStaticAssets(path.join(__dirname, '../../frontend/build'));
  }

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
