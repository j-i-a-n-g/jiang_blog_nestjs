import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create_user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {svgBorn} from '../plugins/svg/svg-captcha'
import { LocalAuthGuard } from 'src/common/module/auth/guard/auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly useServer: UserService){}

  /**
   * 用户登录
   * @param userMsg
   * @returns 
   */
  @ApiBody({
    type: LoginUserDto,
    required: true,
    description: '用户名和密码'
   })
  @Post('login')
  loginRoot(@Body() userMsg: LoginUserDto) {
    console.log(userMsg)
    return this.useServer.rootLogin(userMsg)
  }

  /**
   * 用户注册
   */
  @Post('register')
  @ApiBody({
    type: CreateUserDto,
    required: true,
   })
  register(@Body() createUser: CreateUserDto) {
    return this.useServer.register(createUser)
  }

  /**
   * 用户退出登录
   */
  @Get('logout')
  logout(@Query() userMsg: LoginUserDto){
    return this.useServer.logout(userMsg)
  }

  /**
   * 用户重置密码
   */
  @UseGuards(LocalAuthGuard)
  @Post('resetPwd')
  @ApiBody({
    type: LoginUserDto,
    required: true,
    description: '用户名和密码'
   })
  changePwd(@Body() userMsg: LoginUserDto) {
    return this.useServer.changePwd(userMsg)
  }

  /**
   * 获取验证码
   */
  @Get('getsvg')
  bornSvgCaptcha() {
    const {text, data} = svgBorn()
    return {data, text}
  }

  /**
   * 管理员登录
   */
  @Post('rootLogin')
  rootLogin() {
    return '登录成功'
  }

}
