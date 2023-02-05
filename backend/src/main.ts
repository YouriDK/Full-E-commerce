import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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
  const config = new DocumentBuilder()
    .setTitle('ShopX')
    .setDescription('ShopX Backend Nest API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
