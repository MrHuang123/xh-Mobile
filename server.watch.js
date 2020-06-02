const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const shelljs = require('shelljs')
// fs.watch(path.resolve(__dirname,'src'),(e,file)=>{
//   console.log(e)
// })

chokidar.watch(path.resolve(__dirname,'src')).on('change',()=>{
  console.log(1212)
  shelljs.exec('npm run build')
  throw new Error('重新开始');

})