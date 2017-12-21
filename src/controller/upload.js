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
     this.assign('title', '图片上传');
     return this.display();
 }

 // 提交上传
  async uploadAction() {

    //image
    var file = this.ctx.file('image')  // 获取file信息

    const reader = fs.createReadStream(file.path);  // 要被拷贝的源文件

    const stream = fs.createWriteStream(path.join(__dirname+'/../../www/static/upload', file.name)); // 写入数据位置，名字

    reader.pipe(stream); // 文件被添加到 uploadImg文件夹

    file.path = __dirname+'/../../www/static/upload'+file.name

    console.log('上传图片到', file.name, stream.path);

    console.log(file)

    this.assign('fileInfo', '/static/upload'+file.name);

    return this.display()
  }

  // 七牛上传-页面
  async qnuploadAction() {

      let qconfig = this.config('qiniu');
      var accessKey = qconfig.access_key;
      var secretKey = qconfig.secret_key;

      // 生成mac算法实例
      var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

      // 生成上传凭证给web表单使用
      var options = {
          scope: qconfig.bucket,
          returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken = putPolicy.uploadToken(mac);

      console.log('-----------')
      console.log(uploadToken)
      console.log(qconfig.domain)
      console.log('-----------')

      this.assign({
          uptoken: uploadToken,
          baseUrl: qconfig.domain
      });

      return this.display();
  }

    // 七牛上传-入库
    async localToQiniuAction() {
        var file = this.ctx.file('file');
        // 文件上传
        const data = await toolUpload(file.name, file.path);
        console.log(data);

        if(data.key){
            data.url = 'http://'+ this.config('qiniu').domain +'/'+ data.key;
            this.body= {
                code: 0,
                data: data
            }
        }else{
            this.body= {
                code: -1,
                data: data
            }
        }
    }

}