import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from "class-validator";

export class ArticleTagDto {

  @IsNotEmpty()
  @ApiProperty()
  tagName: string;

  @IsOptional()
  tag: string;
}