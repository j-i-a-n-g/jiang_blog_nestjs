import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDocument } from './schema/article.schema';
import { PaginationDto } from 'src/common/dtos/pagination.dto/pagination.dto';
import { ArticleDto } from './dto/article.dto/article.dto';
import { article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') 
    private articleModule: Model<ArticleDocument>,
    private articleEntity: Repository<article>
  ) {}

  
  async getArticleList(pagination: PaginationDto) {
    const { currentPage, pageSize, offset } = pagination;
    const list = await this.articleModule.find().skip(currentPage).limit(pageSize)
    return list || []
  }

  async saveArticle(articledto: ArticleDto) {
    let {
      articleTitle,
      articleDesc,
      articleFileUrl,
      articleImgUrl,
      author,
      articleHot = false,
      // 文章所属标签
      tagList = []
    } = articledto
    let result = await this.articleEntity.create({
      author,
      createTime: new Date(),
      updateTime: new Date(),
      articleFileUrl,
      articleImgUrl,
      posts: tagList
    })
    let sqlArticle = await this.articleEntity.save(result)
    let modleArticle = await this.articleModule.create({
      articleTitle,
      articleDesc,
      articleFileUrl,
      articleHot,
      articleid: sqlArticle.id
    })
    return modleArticle
  }
  /**
   * 修改文章推荐状态
   */
  // @Post()
  // async changeArticleHot(params:type) => {
    
  // }

}
