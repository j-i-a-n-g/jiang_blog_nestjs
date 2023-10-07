import { IsNotEmpty } from "class-validator";

export class ArticleContent {
  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  path: string
}