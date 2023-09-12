import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create_user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly useServer: UserService){}

  @Post('root')
  loginRoot(@Body() userMsg: LoginUserDto) {
    return this.useServer.rootLogin(userMsg)
  }

  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.useServer.register(createUser)
  }

  @Get('logout')
  logout(@Query() userMsg: LoginUserDto){
    return this.useServer.logout(userMsg)
  }

  @Post('resetPwd')
  changePwd(@Body() userMsg: LoginUserDto) {
    return this.useServer.changePwd(userMsg)
  }
}
