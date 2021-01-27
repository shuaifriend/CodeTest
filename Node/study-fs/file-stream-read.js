/**
 * 流式文件读取，适用于大文件
 */

const fs = require('fs')

const fromPath = '/Users/zhangbing/Downloads/Vue-3-Cheat-Sheet-zh.pdf'
// 创建一个可读流
const readStream = fs.createReadStream(fromPath)
// 创建一个可写流
const writeStream = fs.createWriteStream('Vue-3-Cheat-Sheet-zh.pdf')

readStream.once('open', function() {
    console.log('可读流打开~~~')
})
writeStream.once('open', function() {
    console.log('可写流打开~~~')
})

readStream.once('close', function() {
    console.log('可读流关闭~~~')
    // 数据读取完毕，关闭可写流
    writeStream.end()
})

// 如果要读取一个可读流中的数据，必须要为可读流绑定一个data事件，data事件绑定完毕会自动开始读取数据
// 不能用once
readStream.on('data', function(data) {
    console.log('读取数据....', data)
    // 再写文件
    writeStream.write(data)
})