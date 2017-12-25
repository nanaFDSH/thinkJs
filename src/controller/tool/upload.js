// 七牛 封装的上传方法
const qiniu = require('qiniu');
const appConfig = require('../../config/config.js');

/** *
 * @param filename 文件名
 * @param localFile 文件路径
 * @param putExtra
 * @returns {Promise}
 */
module.exports = function(filename, localFile) {
  return new Promise(function(resolve, reject) {
    const qconfig = appConfig.qiniu;
    const accessKey = qconfig.access_key;
    const secretKey = qconfig.secret_key;

    const config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z2;

    // 生成mac算法实例
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    // 生成上传凭证给web表单使用
    const options = {
      scope: qconfig.bucket,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);

    // var localFile = file.path;  //這裡要換
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    formUploader.putFile(uploadToken, filename, localFile, putExtra, function(respErr, respBody, respInfo) {
      if (respErr) {
        // throw respErr;
        reject(respErr);
      }
      if (respInfo.statusCode === 200) {
        // console.log(respBody.key);
        resolve(respBody);
      } else {
        // console.log(respInfo.statusCode);
        // console.log(respBody);
        reject(respBody);
      }
    });
  });
};
