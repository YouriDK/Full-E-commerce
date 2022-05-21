import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
