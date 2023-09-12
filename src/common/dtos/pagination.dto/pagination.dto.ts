import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  currentPage: number = 1; // 第几页

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  pageSize: number = 20; // 条数

  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number; // 查询起始位置
}
