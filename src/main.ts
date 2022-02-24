import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
