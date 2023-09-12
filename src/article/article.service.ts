import { Get, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDocument } from './schema/article.schema';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private articleModule: Model<ArticleDocument>) {}

  /**
   * 获取文章列表
   * @returns Array
   */
  @Get()
  async getArticleList() {
    const list = await this.articleModule.find()
    return list || []
  }

  /**
   * 修改文章推荐状态
   */
  // @Post()
  // async changeArticleHot(params:type) => {
    
  // }

}
