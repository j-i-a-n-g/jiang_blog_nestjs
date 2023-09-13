import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class ArticleTagDto {

  @IsNotEmpty()
  @ApiProperty()
  tagName: string;

}