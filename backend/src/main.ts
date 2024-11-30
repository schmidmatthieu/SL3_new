import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());
  app.enableCors();

  // Compression
  app.use(compression());

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('SL3 API')
    .setDescription('The SL3 API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Metrics for Prometheus
  await app.get(PrometheusModule.makeMetricsModule());

  await app.listen(4000);
}
bootstrap();
