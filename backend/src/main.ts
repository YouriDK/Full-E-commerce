import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import path from 'path';
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
  });
  app.setGlobalPrefix('api');
  app.use('*', path.join(__dirname, '../../frontend/build/index.html'));
  // app.get('*', (res: any) => {
  //   res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  // });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
