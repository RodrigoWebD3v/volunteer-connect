import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvFile } from 'node:process';
import { AppModule } from './app.module';

function loadLocalEnvFiles() {
  const candidates = [
    resolve(process.cwd(), '.env'),
    resolve(process.cwd(), 'backend/.env'),
    resolve(process.cwd(), '../.env'),
  ];

  for (const envPath of new Set(candidates)) {
    if (existsSync(envPath)) {
      loadEnvFile(envPath);
    }
  }
}

async function bootstrap() {
  loadLocalEnvFiles();
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.use(json({ limit: '4mb' }));
  app.use(urlencoded({ extended: true, limit: '4mb' }));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.BACKEND_PORT ?? process.env.PORT ?? 3000);
}
void bootstrap();
