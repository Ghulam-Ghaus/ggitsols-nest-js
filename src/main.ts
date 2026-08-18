import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const port = Number(process.env.PORT);
  const app = await NestFactory.create(AppModule);
   // Allow CORS from all origins
  app.enableCors({
    origin: '*',
  });
  await app.listen(port);
  console.log('app is running on port :', port);
}
bootstrap();
