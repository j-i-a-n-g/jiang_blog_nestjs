import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schema/article.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { article } from './entities/article.entity';
import { Article_Tag } from 'src/article_tag/entities/article_tag.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Article.name, schema: ArticleSchema}]),
    TypeOrmModule.forFeature([article, Article_Tag]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
