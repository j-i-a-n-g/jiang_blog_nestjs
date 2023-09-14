import * as fs from 'fs';
import * as iconv from 'iconv-lite';
const path = require('path')

export const saveFile = function(file: Express.Multer.File): Promise<any> {
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