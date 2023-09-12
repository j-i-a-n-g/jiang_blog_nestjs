import { IsNotEmpty, IsOptional } from "class-validator";
import { Article_Tag } from "src/article_tag/entities/article_tag.entity";

export class ArticleDto {

  @IsNotEmpty()
  author: string;

  articleTitle: string;

  articleDesc: string;

  createDate: Date;

  @IsOptional()
  articleHot: boolean = false;

  articleFileUrl: string;

  articleImgUrl: string;

  @IsOptional()
  tagList: Array<Article_Tag> = [];

}
