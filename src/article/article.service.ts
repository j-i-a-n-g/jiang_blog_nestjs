import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDocument } from './schema/article.schema';
import { PaginationDto } from 'src/common/dtos/pagination.dto/pagination.dto';
import { ArticleDto } from './dto/article.dto/article.dto';
import { ArticleEntity } from './entities/article.entity';
import { Repository, ObjectId } from 'typeorm';
import { pageMsgDto } from 'src/common/dtos/pagination.dto/pageMsg.dto';
import { ArticleChangeDto } from './dto/articleChange.dto';
import { Article_Tag } from 'src/article_tag/entities/article_tag.entity';
import { ArticleTagChangeDto } from './dto/articleTagChange.dto';
import { AuthService } from 'src/common/module/auth/auth.service';
import { ChangeArticleHot } from './dto/changeArticleHot.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') 
    private articleModule: Model<ArticleDocument>,
    @InjectRepository(ArticleEntity)
    private articleEntity: Repository<ArticleEntity>,
    @InjectRepository(Article_Tag)
    private articleTag: Repository<Article_Tag>,
    private readonly authService: AuthService
  ) {}

  
  async getArticleList(pagination: PaginationDto) {
    const { currentPage, pageSize, offset } = pagination;
    const total: number = await this.articleModule.countDocuments()
    const list = await this.articleModule.find().skip(currentPage).limit(pageSize)
    // for(let i = 0; i < list.length; i++) {
    //   let result = await this.articleEntity.create({
    //     author: 'lijiang',
    //     articleId: JSON.stringify(list[i]._id).replaceAll('"', ""),
    //     articleImgUrl: list[i].articleImgUrl,
    //     articleFileUrl: list[i].articleFileUrl,
    //   })
    //   await this.articleEntity.save(result)
    // }
    let pageMsg : pageMsgDto = {
      currentPage,
      pageSize,
      total
    }
    return {
      pagination: pageMsg,
      list: list || [],
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
    // 开启事务
    const session = await this.articleModule.db.startSession();
    await session.startTransaction()
    try {
      let modleArticle = await this.articleModule.create({
        articleTitle,
        articleDesc,
        articleFileUrl,
        articleImgUrl,
        articleHot,
      })
      let result = await this.articleEntity.create({
        author,
        createTime: new Date(),
        updateTime: new Date(),
        articleFileUrl,
        articleImgUrl,
        articleId: JSON.stringify(modleArticle._id).replaceAll('"', ''),
        posts: tagList
      })
      await this.articleEntity.save(result)
      await session.commitTransaction();
      session.endSession()
      return modleArticle
    } catch (error) {
      await session.abortTransaction();
      session.endSession()
      return new HttpException(error, 500)
    }
    
  }
  /**
   * 删除文章
   */
  async deleteArticle(id: string) {
    try {
      let moduleResult = await this.articleModule.findByIdAndDelete(id)
      let entityResult = await this.articleEntity.delete({
        articleId: id
      })
      if(entityResult.affected > 0 && moduleResult) {
        return '删除成功'
      } else {
        return new HttpException('删除失败', 500)
      }
    } catch (error) {
      return new HttpException(error, 500)
    }
  }

  /**
   * 修改文章的标题或者内容
   */
  async reviseArticleTitle(articleChangeDto: ArticleChangeDto) {
    try {
      let { _id, articleTitle, articleDesc } = articleChangeDto
      let result = await this.articleModule.updateOne({_id}, {articleTitle, articleDesc})
      if(result.modifiedCount > 0) {
        return '修改成功'
      } else {
        return new HttpException('修改失败，稍后重试', 500)
      }
    } catch (error) {
      return error
    }
  }

  /**
   * 获取文章相关的tag
   */

  async getArticleTagList(id: string) {
    let loop = await this.articleModule.findById(id) as any
    if(loop && loop.articleTagList) {
      let tagsList = loop.articleTagList
      let result = []
      for(let i = 0; i < tagsList.length; i++) {
        let tagObj = await this.articleTag.findOne({
          where: {
            tagName: tagsList[i].tagName
          }
        })
        result.push(tagObj)
      }
      return result
    } else {
      return loop
    }
  }
  /**
   * 修改文章推荐状态
   */
  async changeArticleHot(article: ChangeArticleHot) {
    let { id, articleHot } = article
    let result = await this.articleModule.updateOne({id}, {articleHot})
    return result
  }

  /**
   * 修改文章的相关Tag
   */
  async reviseArticleTagList(article: ArticleTagChangeDto) {
    try {
      let { id, tagList } = article
      let result = await this.articleModule.updateOne({id}, {tagList})
      return result
    } catch (error) {
      return new HttpException(error, 500)
    }
  }
  /**
   * 修改文章的封面图片路径
   */
  async changeArticleImgPath(path: string, id: string) {
    try {
      await this.articleModule.findOneAndUpdate({_id: id}, {articleImgUrl: path} ,{ new: true })
      let article = await this.articleEntity.findOne({
        where: {
          articleId: id
        }
      })
      if(article) {
        article.articleImgUrl = path;
        let result = await this.articleEntity.createQueryBuilder()
        .update(ArticleEntity)
        .set({articleImgUrl: path})
        .where('articleId= :id', {id})
        .execute()
        if(result.affected > 0) {
          return '保存成功'
        } else {
          return new HttpException('保存失败', 500)
        }
      } else {
        throw new HttpException('保存失败', 500)
      }
    } catch (error) {
      return new HttpException(error, 500)
    }
  }

}
