import { UserService } from './../../../user/user.service';
import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as iconv from 'iconv-lite';
const path = require('path')
import { Buffer } from 'node:buffer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.rootLogin({ username, password });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * 保存前端传的文件的方法
   * @param file 要保存的文件 
   * @param origin 保存的类型
   */
  saveFile(file: Express.Multer.File, origin?: String): Promise<any> {
    let { originalname, mimetype, size } = file
    const decodedName = iconv.decode(Buffer.from(originalname, 'binary'), 'utf-8').replace(/[()]/g, '')
    let dirPath = ""
    let filePath = ""
    let fileName = ""
    let absolutePath = ""
    if (origin) {
      fileName = Date.now() + decodedName
      // dirPath = path.join(__dirname, '../../public/' + origin)
      // filePath = path.join(__dirname, `../../public/${origin}/${fileName}`)
      dirPath = path.join(process.cwd(), '/common/public/' + origin);
      filePath = path.join(process.cwd(), `/common/public/${origin}/${fileName}`)
      absolutePath = `/${origin}/${fileName}`
    } else {
      fileName = Date.now() + decodedName
      // dirPath = path.join(__dirname, '../../public/articleFile');
      // filePath = path.join(__dirname, '../../public/articleFile/' + fileName)
      dirPath = path.join(process.cwd(), '/common/public/articleFile');
      filePath = path.join(process.cwd(), '/common/public/articleFile/' + fileName)
      absolutePath = '/articleFile/' + fileName
    }
    return new Promise((res, rej) => {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          console.error('Failed to save file:', err);
          rej(err)
        } else {
          console.log('File saved successfully.');
          // 缺失逻辑，如果是替换的话，需删除旧的文件
          res(absolutePath)
        }
      });
    })
  }

  saveContentIntoFile(content: string, articlePath: string) {
    try {
      // let url = path.resolve(__dirname, '../../public' + articlePath)
      let url = path.join(process.cwd(), '/common/public' + articlePath)
      fs.writeFile(url, content, (err) => {
        if (err) {
          throw new Error('写入失败')
        } else {
          return '修改成功'
        }
      })
    } catch (error) {
      return error
    }
  }

  /**
   * 删除已上传文件
   * @param fileUrl 文件相对路径
   */
  deleteFile(fileUrl: string) {
    let url = path.join(process.cwd(), '/common/public' + fileUrl)
    try {
      fs.unlinkSync(url);
      return '删除成功'
    } catch (error) {
      return new HttpException('删除失败', 500)
    }
  }

  /**
   * 随机生成一定长度的字符串
   * @param startStr 随机字符串的开头格式，默认为空
   * @param length 随机字符串长度
   * @returns string
   */
  generateRandomString(startStr: string = "", length: number = 12): string {
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters = '0123456789';
    let randomString: string = startStr + '-';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString
  }
}
