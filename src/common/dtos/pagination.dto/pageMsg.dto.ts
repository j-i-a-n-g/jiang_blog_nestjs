import { IsNumber } from "class-validator";

export class pageMsgDto {
  
  @IsNumber()
  currentPage: number = 1; // 第几页

  @IsNumber()
  pageSize: number = 20; // 条数

  @IsNumber()
  total: number; // 查询起始位置
  
}