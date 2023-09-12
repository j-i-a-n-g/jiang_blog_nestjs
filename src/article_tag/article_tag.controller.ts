import { Body, Controller, Get, Post, Redirect } from '@nestjs/common';
import { ArticleTagService } from './article_tag.service';
import { ArticleTagDto } from './dto/article_tag.dto/article_tag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articleTag')
@Controller('articleTag')
export class ArticleTagController {
  constructor(
    private readonly articleTagService: ArticleTagService
  ) {}

  @Get()
  async getAllTag() {
    return await this.articleTagService.getAllTag()
  }

  @Post('createArticleTag')
  async createNewTag(@Body() articleTag: ArticleTagDto) {
    return await this.articleTagService.createNewTag(articleTag)
  }

  @Get('redict')
  @Redirect('http://localhost:3001')
  test() {
    return {url: 'http://localhost:3000/articleTag'}
  }
}
