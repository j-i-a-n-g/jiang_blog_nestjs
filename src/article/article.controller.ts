import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto/pagination.dto';

@ApiTags('root')
@Controller('root')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService
  ) {}
  /**
   * 获取文章列表
   * @returns Array
   */
  @Get('getArticlelist')
  async getArticleList(@Query() pagination: PaginationDto) {
    return await this.articleService.getArticleList(pagination)
  }
}
