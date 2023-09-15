import { IsNotEmpty, IsOptional } from "class-validator";

export class ArticleChangeDto {

  @IsNotEmpty()
  _id: string
  
  @IsOptional()
  articleTitle: string;

  @IsOptional()
  articleDesc: string;

}