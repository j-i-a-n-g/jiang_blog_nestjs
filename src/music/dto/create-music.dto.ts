import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateMusicDto {

  @IsNotEmpty()
  @ApiProperty()
  m_name: string;

  @IsOptional()
  @ApiProperty()
  m_url: string;

  @IsOptional()
  @ApiProperty()
  m_coverImg_url: string;

  @IsOptional()
  @ApiProperty()
  m_author: string;

  @IsOptional()
  @ApiProperty()
  m_language: string;

  @IsOptional()
  @ApiProperty()
  m_desc: string | null;

  @IsOptional()
  @ApiProperty()
  m_lyrics: string | null;

  @IsNotEmpty()
  @ApiProperty()
  createTime: Date = new Date();

  // @IsNotEmpty()
  // @ApiProperty()
  // m_tags: Array<M_TagService>;
}
