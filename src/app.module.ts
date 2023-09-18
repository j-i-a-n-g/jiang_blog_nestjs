import { MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/entities/user.entity';
import { ArticleTagModule } from './article_tag/article_tag.module';
import { ArticleModule } from './article/article.module';
import { Article_Tag } from './article_tag/entities/article_tag.entity';
import { article } from './article/entities/article.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './common/module/auth/auth.module';
import { Article, ArticleSchema } from './article/schema/article.schema';
import { WinstonModule } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston';
import { join } from 'path';
import { LoggerMiddleware } from './common/middeware/logger.middleware';
const moment = require('moment') 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'tea',
      synchronize: true, // TyperOrmModule实体和数据库同步
      autoLoadEntities: true, // 自动加载模块而不是指定实体数组
    }),
    // 生成请求日志
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('jiang_blog', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('jiang_blog', {
              prettyPrint: true,
            }),
          ),
          filename: join(process.cwd(), `/log/nest-${moment().format('yyyy-MM-DD')}.txt`)
        }),
      ],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/blog'),
    TypeOrmModule.forFeature([User, Article_Tag, article]),
    MongooseModule.forFeature([{name: Article.name, schema: ArticleSchema}]),
    ArticleTagModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
