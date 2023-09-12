import { IsNotEmpty } from "class-validator";
import { Article_Tag } from "src/article_tag/entities/article_tag.entity";

export class ArticleDto {

  @IsNotEmpty()
  author: string;

  fileStream: string;

  tagList: Array<Article_Tag>

}
