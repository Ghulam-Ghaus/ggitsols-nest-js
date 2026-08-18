import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const port = Number(process.env.PORT);
  const app = await NestFactory.create(AppModule);
  // import {middleware} from "./middleware.ts";
  await app.listen(port);
  console.log('app is running on port : ', port)
}
bootstrap();
