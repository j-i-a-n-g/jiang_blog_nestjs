import { IsNotEmpty } from "class-validator";

export class ArticleTagDto {

  @IsNotEmpty()
  tagName: string;

}