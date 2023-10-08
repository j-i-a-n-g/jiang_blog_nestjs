import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Article_Tag } from './entities/article_tag.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ArticleTagDto } from './dto/article_tag.dto/article_tag.dto';
import { AuthService } from 'src/common/module/auth/auth.service';

@Injectable()
export class ArticleTagService {
  constructor(
    @InjectRepository(Article_Tag)
    private articleTag: Repository<Article_Tag>,
    private readonly authService: AuthService
  ) { }

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
    tagDto.tag = this.authService.generateRandomString('ARTAG', 12)
    let tag = await this.articleTag.create(tagDto)
    return await this.articleTag.save(tag)
  }
  /**
   * 删除tag
   */
  async deleteTag(tag: string) {
    const entity = await this.articleTag.delete({ tag });
    if (entity) {
      return '删除成功'
    } else {
      return new HttpException('删除失败', 500)
    }
  }

}
