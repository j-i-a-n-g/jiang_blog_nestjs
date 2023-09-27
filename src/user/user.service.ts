import { CreateUserDto } from './dto/create_user.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { LoginUserDto } from './dto/login.dto';
// import { AuthService } from 'src/common/module/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userEntity: Repository<User>,
    // private readonly authService: AuthService
  ) {}

  async rootLogin(rootMsg: LoginUserDto) {
    let root = await this.userEntity.findOne({
      where: {
        username: rootMsg.username
      }
    })
    if(root) {
      let result = await this.userEntity.findOne({
        where: {
          username: rootMsg.username,
          password: rootMsg.password
        }
      })
      if(result) {
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

    let userObj = {
      username,
      // userTag: this.authService.generateRandomString('USER', 12),
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
