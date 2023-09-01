import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001'],
    methods: ['POST', 'PATCH', 'PUT', 'GET', 'DELETE', 'HEAD', 'OPTIONS'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();
