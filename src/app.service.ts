import { Injectable } from '@nestjs/common';
import { AuthService } from './common/module/auth/auth.service';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
  ) { }
  // getHello(): string {
  //   return 'Hello World!';
  // }
  async deleteFile(url: string) {
    return await this.authService.deleteFile(url)
  }
}
