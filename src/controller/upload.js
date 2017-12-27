const Base = require('./base.js');
const toolUpload = require('./tool/upload');

// 图片上传本地
const fs = require('fs');
const path = require('path');

// 七牛
const qiniu = require('qiniu');

module.exports = class extends Base {
    // 打开图片上传页面
    async indexAction() {

        this.assign({
            'title': '图片上传到本地',
            'msg': '上传图片'
        });
        return this.display();
    }

    // 图片上传到本地
    async bduploadAction() {
        let file = this.ctx.file('image'); // 获取file信息

        let reader = fs.createReadStream(file.path); // 要被拷贝的源文件

        let stream = fs.createWriteStream(path.join(__dirname + '/../../www/static/upload', file.name)); // 写入数据位置，名字

        reader.pipe(stream); // 文件被添加到 uploadImg文件夹

        file.path = __dirname + '../../www/static/upload' + file.name;

        let data = {}
        data.url = '/static/upload/' + file.name

        this.body = {
            code: 0,
            data: data,
            msg: '上传图片成功'
        };
    }

    // 七牛上传-页
    async qnuploadAction() {
        this.assign('title', '七牛图片上传');
        return this.display();
    }

    // 七牛上传-入库
    async localToQiniuAction() {
        let file = this.ctx.file('file');
        let data = await toolUpload(file.name, file.path);  // 文件上传

        if (data.key) {

            data.url = 'http://' + this.config('qiniu').domain + '/' + data.key // 回传

            this.body = {
                code: 0,
                data: data
            };
        } else {
            this.body = {
                code: -1,
                data: data
            };
        }
    }
};
