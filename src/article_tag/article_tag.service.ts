import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Article_Tag } from './entities/article_tag.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ArticleTagDto } from './dto/article_tag.dto/article_tag.dto';

@Injectable()
export class ArticleTagService {
  constructor(
    @InjectRepository(Article_Tag)
    private articleTag: Repository<Article_Tag>
  ){}

  async getAllTag() {
    return await this.articleTag.find()
  }

  async createNewTag(articleTag: ArticleTagDto) {
    await this.articleTag.create({
      ...articleTag
    })

    return await this.articleTag.save({
      ...articleTag
    })
  }

  /**
   * 获取所有的tag
   */
  async getTagList() {
    let result = await this.articleTag.find()
    return result
  }

}
