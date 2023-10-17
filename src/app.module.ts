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
import { ArticleEntity } from './article/entities/article.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './common/module/auth/auth.module';
import { Article, ArticleSchema } from './article/schema/article.schema';
import { WinstonModule } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from './common/middeware/logger.middleware';
import { MusicModule } from './music/music.module';
const moment = require('moment')

@Module({
  imports: [
    // 用于根据不同环境配置不同的键值对
    ConfigModule.forRoot({
      // 可传字符串，如果传数组则根据数组从头到尾找文件，找到文件即停止，用当前文件
      envFilePath: ['.env', '.development'],
      // 生产环境时，可能不需要通过.env设置数据库信息了，那么可以配置该属性
      // ignoreEnvFile: process.env.NODE_ENV !== 'development'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DATABASE_HOST,
      port: +process.env.MYSQL_DATABASE_PORT,
      username: process.env.MYSQL_DATABASE_USER,
      password: process.env.MYSQL_DATABASE_PASSWORD,
      database: process.env.MYSQL_DATABASE_NAME,
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
    TypeOrmModule.forFeature([User, Article_Tag, ArticleEntity]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    ArticleTagModule,
    AuthModule,
    ArticleModule,
    MusicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*')
  // }
}
