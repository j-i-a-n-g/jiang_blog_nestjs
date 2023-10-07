import { IsNotEmpty } from "class-validator";

export class ChangeArticleHot {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  articleHot: boolean;
}