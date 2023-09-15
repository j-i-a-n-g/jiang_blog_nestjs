import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDocument } from './schema/article.schema';
import { PaginationDto } from 'src/common/dtos/pagination.dto/pagination.dto';
import { ArticleDto } from './dto/article.dto/article.dto';
import { article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { pageMsgDto } from 'src/common/dtos/pagination.dto/pageMsg.dto';
import { ArticleChangeDto } from './dto/articleChange.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') 
    private articleModule: Model<ArticleDocument>,
    @InjectRepository(article)
    private articleEntity: Repository<article>
  ) {}

  
  async getArticleList(pagination: PaginationDto) {
    const { currentPage, pageSize, offset } = pagination;
    const total: number = await this.articleModule.countDocuments()
    const list = await this.articleModule.find().skip(currentPage).limit(pageSize)
    let pageMsg : pageMsgDto = {
      currentPage,
      pageSize,
      total
    }
    return {
      pagination: pageMsg,
      list: list || []
    }
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
   * 删除文章
   */
  async deleteArticle(id: string) {
    return await this.articleModule.findByIdAndDelete(id)
  }

  /**
   * 修改文章的标题或者内容
   */
  async reviseArticleTitle(articleChangeDto: ArticleChangeDto) {
    try {
      let { _id, articleTitle, articleDesc } = articleChangeDto
      let result = await this.articleModule.updateOne({_id}, {articleTitle, articleDesc})
      if(result.modifiedCount > 0) {
        return null
      } else {
        return new HttpException('修改失败，稍后重试', 500)
      }
    } catch (error) {
      return error
    }
  }
  /**
   * 修改文章推荐状态
   */
  // @Post()
  // async changeArticleHot(params:type) => {
    
  // }

}
