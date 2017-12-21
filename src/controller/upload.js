const Base = require('./base.js');
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

        //image
        var file = this.ctx.file('file')  // 获取file信息

        let qconfig = this.config('qiniu');
        var accessKey = qconfig.access_key;
        var secretKey = qconfig.secret_key;

        var config = new qiniu.conf.Config();
        // 空间对应的机房
        config.zone = qiniu.zone.Zone_z2;

        // 生成mac算法实例
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

        // 生成上传凭证给web表单使用
        var options = {
            scope: qconfig.bucket,
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);

        var localFile = file.path;  //這裡要換
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
        var key = file.name; //這裡也要換這是

        // 文件上传
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,respBody, respInfo) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                console.log('+++++++++++++++++++++++++++++')
                console.log(respBody.key);

                const url = qconfig.domain +'/'+ respBody.key

            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }

            return url
        });

        console.log(url);
        this.assign('imgUrl',url);
        this.ctx.redirect('/upload/qnupload'); // 返回登录页
    }

}