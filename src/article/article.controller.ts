import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto/pagination.dto';
import { ArticleFileDto } from './dto/articleFile.dto';
import { ArticleDto } from './dto/article.dto/article.dto';

@ApiTags('article')
@Controller('article')
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
  /**
   * 保存新文章
   */
  @Post('saveArticle')
  @ApiBody({
    type: ArticleDto
   })
  async saveArticle(@Body() articledto: ArticleDto) {
    return await this.articleService.saveArticle(articledto)
  }

  /**
   * 删除上传的文章文件
   */
  // @Post('deleteFile')
  // async deleteFile(@Body() articleFileDto: ArticleFileDto) {

  // }
}
