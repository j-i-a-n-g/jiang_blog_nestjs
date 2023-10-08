import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "请输入用户名" })
  @ApiProperty()
  username: string;

  @IsNotEmpty({ message: "请输入密码" })
  @ApiProperty()
  password: string;

  // userAvatar: string;
}
