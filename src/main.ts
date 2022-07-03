import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 5000;
  app.useStaticAssets('public');
  await app.listen(port);
  new Logger('Server', { timestamp: true }).debug(`🚀 Running on localhost:${port}/my-graphql`);
}
bootstrap();
