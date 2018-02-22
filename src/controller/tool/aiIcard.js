const aiConfig = require('../../config/config.js');
const fs = require('fs');

const recognizeIdCard = function(image, idCardSide, options) {
  return new Promise(function(resolve, reject) {
    const AipOcrClient = require('baidu-aip-sdk').ocr;

    // 设置APPID/AK/SK
    const APP_ID = aiConfig.ai.app_id;
    const API_KEY = aiConfig.ai.api_key;
    const SECRET_KEY = aiConfig.ai.secret_key;

    // 新建一个对象，建议只保存一个对象调用服务接口
    const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

    // 带参数调用身份证识别
    client.idcard(image, idCardSide, options).then(function(result) {
      // console.log(JSON.stringify(result));
      resolve(result);
    }).catch(function(err) { // 如果发生网络错误
      // console.log(err);
      reject(err); // throw respErr;
    });
  });
};

module.exports.recognizeIdCard = recognizeIdCard; // 身份正识别
