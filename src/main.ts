import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // mongoose.connect('mongodb://localhost/blog-api', {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
  // }).then(() => console.log('连接成功'));
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const options = new DocumentBuilder()
    .setTitle('个人后台')
    .setDescription('个人后台服务系统')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
