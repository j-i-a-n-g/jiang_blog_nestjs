import { CreateUserDto } from './dto/create_user.dto';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { LoginUserDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
// import { AuthService } from 'src/common/module/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userEntity: Repository<User>,
    // @Inject(forwardRef(() => AuthService))
    // private readonly authService: AuthService
    private readonly configService: ConfigService,
  ) {
    let host = this.configService.get<String>('MYSQL_DATABASE_HOST')
  }

  async rootLogin(rootMsg: LoginUserDto) {
    let root = await this.userEntity.findOne({
      where: {
        username: rootMsg.username
      }
    })
    if (root) {
      let result = await this.userEntity.findOne({
        where: {
          username: rootMsg.username,
          password: rootMsg.password
        }
      })
      if (result) {
        return result
      } else {
        throw new NotFoundException(`Password Error`)
      }
    } else {
      // throw new NotFoundException(`Tea #${rootMsg.username} not Found`)
      return this.register(rootMsg)
    }
  }

  async register(createUser: CreateUserDto) {
    const { username, password } = createUser;
    const user = await this.userEntity.findOne({
      where: { username }
    })
    if (user) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    function generateRandomString(startStr: string = "", length: number = 12): string {
      // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const characters = '0123456789';
      let randomString: string = startStr + '-';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }

      return randomString
    }
    let userObj = {
      username,
      userTag: generateRandomString('USER', 12),
      password,
      userAvatar: '',
      createDate: new Date(),
      lastOriginTime: new Date()
    }
    const newUser = await this.userEntity.create(userObj);
    return await this.userEntity.save(newUser)
  }

  async logout(userMsg: LoginUserDto) {
    let result = await this.userEntity.findOne({
      where: {
        username: userMsg.username,
        password: userMsg.password
      }
    })
    await this.userEntity.update(result.id, { lastOriginTime: new Date() })
    return `${result.username}退出登录`
  }

  async changePwd(userMsg: LoginUserDto) {
    let result = await this.userEntity.findOne({
      where: {
        username: userMsg.username
      }
    })
    await this.userEntity.update(result.id, { password: userMsg.password })
  }
}
