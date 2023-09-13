import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from "class-validator";
import { Article_Tag } from "src/article_tag/entities/article_tag.entity";

export class ArticleDto {

  @IsNotEmpty()
  @ApiProperty({required: true, description: '作者'})
  author: string;

  @ApiProperty({required: true, description: '文章标题'})
  articleTitle: string;

  @ApiProperty({required: true, description: '文章简介'})
  articleDesc: string;

  @ApiProperty({required: false, description: '创建日期'})
  createDate: Date;

  @ApiProperty({required: false, description: '是否推荐,默认否'})
  @IsOptional()
  articleHot: boolean = false;

  @ApiProperty({required: true, description: '文章主体内容所在文件url'})
  articleFileUrl: string;

  @ApiProperty({required: true, description: '文章封面图片'})
  articleImgUrl: string;

  @ApiProperty({required: false, description: '文章相关标签'})
  @IsOptional()
  tagList: Array<Article_Tag> = [];

}
