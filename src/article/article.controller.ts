import { ArticleChangeDto } from './dto/articleChange.dto';
import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors, Param, Delete, HttpException } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto/pagination.dto';
import { ArticleFileDto } from './dto/articleFile.dto';
import { ArticleDto } from './dto/article.dto/article.dto';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import * as iconv from 'iconv-lite';
// import { saveFile } from 'src/common/helper';
import { ArticleTagChangeDto } from './dto/articleTagChange.dto';
import { AuthService } from 'src/common/module/auth/auth.service';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly authService: AuthService
  ) {}
  /**
   * 获取文章列表
   * @returns Array
   */
  @Get('getArticlelist')
  async getArticleList(@Param() pagination: PaginationDto) {
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

  @Post('uploadFile')
  @ApiBody({})
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // 未完善，需要根据文章id，保存文件路径
    return await this.authService.saveFile(file)
  }

  @Delete('deleteArticle')
  async deleteArticle(@Param('id') id: string) {
    let reuslt =  await this.articleService.deleteArticle(id)
    if(!reuslt) {
      return new HttpException('删除失败，查无此文件', 500)
    }
    return reuslt
  }

  /**
   * 对文章标题或者内容的修改
   */
  @Post('reviseArticleTitle')
  @ApiBody({
    type: ArticleChangeDto,
  })
  async reviseArticleTitle(@Body() articleChangeDto: ArticleChangeDto) {
    return await this.articleService.reviseArticleTitle(articleChangeDto)
  }

    /**
   * 获取文章相关的tag
   */
  @Get('getArticleTagList')
  async getArticleTagList(@Query('id') id: string) {
    return await this.articleService.getArticleTagList(id)
  }

  /**
   * 修改文章的推荐状态
   */
  @Post('changeArticleHot')
  async changeArticleHot(@Body() article: ArticleDto) {
    return await this.articleService.changeArticleHot(article)
  }

  /**
   * 修改文章的关联tag
   */
  @Post('reviseArticleTagList')
  async reviseArticleTagList(@Body()  article: ArticleTagChangeDto) {
    return await this.articleService.reviseArticleTagList(article)
  }

  @Post('reviseArticleImg')
  @UseInterceptors(FileInterceptor('file'))
  async reviseArticleImg(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') id: string,
    @Body('articleImgUrl') articleImgUrl: string | null,
  ) {
    return this.authService.saveFile(file, 'articleImg').then((path) => {
      return this.articleService.changeArticleImgPath(path, id)
    }).catch((err) => {
      return err
    })
  }
  /**
   * 删除上传的文章文件
   */
  // @Post('deleteFile')
  // async deleteFile(@Body() articleFileDto: ArticleFileDto) {

  // }
}
