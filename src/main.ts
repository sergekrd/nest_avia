import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function start() {
  const PORT = process.env.PORT || 5004;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('AIRLINES API')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Nest')
    .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
}

start();
