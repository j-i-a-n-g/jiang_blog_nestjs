import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
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
  /**
   * 添加tag
   */
  async addTag(tagDto: ArticleTagDto) {
    let tag = await this.articleTag.create(tagDto)
    return await this.articleTag.save(tag)
  }
  /**
   * 删除tag
   */
  async deleteTag(id: string) {
    // const entity = await this.articleTag.delete({ id });
    // if(entity){
    //     return '删除成功'
    // } else {
    //   return new HttpException('删除失败', 500)
    // }
  }

}
