import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const cors = require('cors');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  const config = new DocumentBuilder()
    .setTitle("contacts app")
    .setDescription("manage your contacts")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document)


  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
        transform: true,
        transformOptions: { groups: ['transform'] },
      })
    )

  await app.listen(4002);
}
bootstrap();
