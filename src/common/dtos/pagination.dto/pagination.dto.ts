import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  
  @IsNumber()
  @IsOptional()
  @ApiProperty({required: false})
  @Type(() => Number)
  currentPage: number = 1; // 第几页

  @IsNumber()
  @IsOptional()
  @ApiProperty({required: false})
  @Type(() => Number)
  pageSize: number = 20; // 条数

  @IsNumber()
  @IsOptional()
  @ApiProperty({required: false})
  @Min(0)
  offset?: number; // 查询起始位置
}
