const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) { // 上传文件的存储位置
    if(file.originalname.endsWith('.md') || file.originalname.endsWith('.txt')) {
      cb(null, path.resolve(__dirname, '../../public/fulltext'))
    } else if(file.originalname.endsWith('.png') 
    || file.originalname.endsWith('.jpg')
    ||file.originalname.endsWith('.jpeg')) {
      cb(null, path.resolve(__dirname, '../../public/img'))
    } else {
      cb(null, path.resolve(__dirname, '../../public/other'))
    }
  },
  filename: function (req, file, cb) { // 设置上传文件名称
    cb(null, Date.now() + file.originalname)
  }
})

module.exports = multer({ storage: storage }).single('file')