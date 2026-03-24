// const fs = require('fs');
import fs from 'fs';
import path from 'path';
// const path = require('path');
const target = path.resolve(__di2rname, '../../log.txt');
// // fs.wiriteFileSync('test.txt', '哈哈哈!');

// //判断当前项目根目录下是否存在test.txt文件

fs.writeFileSync(target, '哈哈哈!', {
  flag: 'a',
  encoding: 'utf-8'
});
