import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { load } from 'js-yaml';
import { readFile } from 'fs/promises';
import { LoggingService } from './logging/logging.service';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const schema = load(await readFile('doc/api.yaml', 'utf-8'));
  SwaggerModule.setup('api', app, schema as any);

  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', () => {
    loggingService.logUncaughtException();
    process.exit(1);
  });

  process.on('unhandledRejection', () => {
    loggingService.logUnhandledRejection();
    process.exit(1);
  });
  // setTimeout(() => {
  //   throw new Error('Oups')
  // }, 2000);

  await app.listen(PORT);
}
bootstrap();
