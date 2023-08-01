import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { load } from 'js-yaml';
import { readFile } from 'fs/promises';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const schema = load(await readFile('doc/api.yaml', 'utf-8'));
  SwaggerModule.setup('api', app, schema as any);
  await app.listen(PORT);
}
bootstrap();
