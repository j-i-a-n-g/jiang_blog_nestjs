import { Get, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDocument } from './schema/article.schema';
import { PaginationDto } from 'src/common/dtos/pagination.dto/pagination.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private articleModule: Model<ArticleDocument>) {}

  
  async getArticleList(pagination: PaginationDto) {
    const { currentPage, pageSize, offset } = pagination;
    const list = await this.articleModule.find().skip(currentPage).limit(pageSize)
    return list || []
  }

  /**
   * 修改文章推荐状态
   */
  // @Post()
  // async changeArticleHot(params:type) => {
    
  // }

}
