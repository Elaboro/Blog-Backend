import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { 
  DocumentBuilder,
  SwaggerModule,
  OpenAPIObject
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipe/validation.pipe';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const config: any = new DocumentBuilder()
    .setTitle("Blog API")
    .setDescription("Demo access: user user")
    .addBearerAuth()
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  app.useGlobalPipes(new ValidationPipe());

  const PORT: string = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
