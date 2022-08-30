import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import path from 'path';
config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
  });

  // app.setGlobalPrefix('api');
  //app.use('*', path.join(__dirname, '../../frontend/build/index.html'));
  console.log('PATH ', __dirname, '../../frontend/build/index.html');
  app.useStaticAssets(path.join(__dirname, '../../frontend/build'));

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
