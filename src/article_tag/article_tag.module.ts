import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArticleTagService } from './article_tag.service';
import { Article_Tag } from './entities/article_tag.entity';
import { ArticleController } from 'src/article/article.controller';
import { ArticleTagController } from './article_tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Article_Tag])],
  controllers: [ArticleTagController],
  providers: [ArticleTagService]
})
export class ArticleTagModule {}
