import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schema/article.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { Article_Tag } from 'src/article_tag/entities/article_tag.entity';
import { AuthModule } from 'src/common/module/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Article.name, schema: ArticleSchema}]),
    TypeOrmModule.forFeature([ArticleEntity, Article_Tag]),
    AuthModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
