import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
const path = require('path')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 适当地设置 HTTP 头, 避免适当地设置 HTTP 头
  app.use(helmet())
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
  // const loggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  // app.useGlobalFilters(new HttpExceptionFilter(loggerService))
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useStaticAssets(path.join(__dirname, './common/public'), {prefix: ''})
  await app.listen(3000);
}
bootstrap();
