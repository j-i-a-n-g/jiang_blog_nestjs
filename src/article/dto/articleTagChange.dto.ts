import { Article_Tag } from 'src/article_tag/entities/article_tag.entity';
import { IsNotEmpty } from "class-validator";

export class ArticleTagChangeDto {

  @IsNotEmpty()
  id: string
  
  @IsNotEmpty()
  tagList: Array<Article_Tag>;

}