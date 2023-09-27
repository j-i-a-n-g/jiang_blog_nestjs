import * as fs from 'fs';
import * as iconv from 'iconv-lite';
const path = require('path')

const saveFile = function(file: Express.Multer.File): Promise<any> {
  const decodedName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8')
  let fileName = Date.now() + decodedName
  const dirPath = path.dirname(path.join(__dirname, '../../public/articleFile'));
  let filePath = path.join(__dirname, '../../public/articleFile/' + fileName)
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
        res('保存成功')
      }
    });
  })
}

/**
 * 随机生成一定长度的字符串
 * @param startStr 随机字符串的开头格式，默认为空
 * @param length 随机字符串长度
 * @returns string
 */
const generateRandomString = function(startStr: string = "", length: number = 12) : string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString : string = startStr;
  let startlen = 0;
  if(startStr) {
    startlen = startStr.length
  }
  for(let i = 0; i < length - startlen; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString
}

export let commonMethod = {
  saveFile,
  generateRandomString
}