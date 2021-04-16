const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


// 获取后缀名方法
const getFileExt = (ctx) => {
  const { name = '' } = ctx.request.files.file;
  return name.split('.').pop();
}

// 保存方法
const saveFileToDisk = (ctx, filename) => {
  return new Promise((resolve, reject) => {
    const file = ctx.request.files.file;
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filename);

    reader.pipe(writer);

    reader.on('end', () => {
      resolve(filename);
    });
    reader.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = {
  getFileExt,
  saveFileToDisk
}