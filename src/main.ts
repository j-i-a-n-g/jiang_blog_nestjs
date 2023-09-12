import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('BLOG_NODE 2.0')
    .setDescription('blog api for jiangBlog writed by nestjs')
    .setVersion('2.0')
    .addTag('Blog')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger/index.html', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 过滤掉请求实体中，后端不需要的属性
    forbidNonWhitelisted: true, // 如果存在后端不需要的属性，返回报错
    transform: true, // 将传入的实体转换成我们需要的类实例
    transformOptions: {
      enableImplicitConversion: true // 不需要使用@Type()显示指定类型，这里会进行默认转换
    }
  }))
  // app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(3000);
}
bootstrap();
