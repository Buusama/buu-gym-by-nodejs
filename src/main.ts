import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { setupS3Configs } from './config/aws.config';
import { setupApiDocument } from './config/swagger.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          [error.property]: error.constraints,
        }));
        return new BadRequestException(result);
      },
    }),
  );
  setupApiDocument(app);
  setupS3Configs();
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
