import { Body, Controller, Get, Post, Redirect, Param } from '@nestjs/common';
import { ArticleTagService } from './article_tag.service';
import { ArticleTagDto } from './dto/article_tag.dto/article_tag.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Query } from 'mongoose';

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
  @ApiBody({
    type: ArticleTagDto,
    required: true,
   })
  async createNewTag(@Body() articleTag: ArticleTagDto) {
    return await this.articleTagService.createNewTag(articleTag)
  }

  @Get('getTagList')
  async getTagList() {
    return await this.articleTagService.getTagList()
  }

  @Get('redict')
  @Redirect('http://localhost:3001')
  test() {
    return {url: 'http://localhost:3000/articleTag'}
  }

  @Post('addTag')
  async addTag(@Body() tagDto: ArticleTagDto) {
    return await this.articleTagService.addTag(tagDto)
  }

  @Get('deleteTag')
  async deleteTag(@Param('tag') tag: string) {
    return await this.articleTagService.deleteTag(tag)
  }
}
