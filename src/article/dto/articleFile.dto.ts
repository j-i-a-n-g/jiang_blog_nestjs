import { IsNotEmpty, IsOptional } from "class-validator";

export class ArticleFileDto {

  @IsNotEmpty()
  @IsOptional()
  author: string;

  @IsNotEmpty()
  fileUrl: string;

}