const aiConfig = require('../../config/config.js');
const fs = require('fs');

let textVoice = function (text) {
    return new Promise(function(resolve, reject) {
        let AipSpeechClient = require("baidu-aip-sdk").speech;

        // 设置APPID/AK/SK
        let APP_ID = aiConfig.ai.app_id;
        let API_KEY = aiConfig.ai.api_key;
        let SECRET_KEY = aiConfig.ai.secret_key;

        // 新建一个对象，建议只保存一个对象调用服务接口
        let client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

        // 语音合成
        client.text2audio(text).then(function(result) {
            if (result.data) {
                // console.log(result.data);
                resolve(result.data)
            } else {
                // console.log(result); // 服务发生错误
                reject(err);
            }
        }, function(e) {
            // console.log(e);  // 发生网络错误
            reject(e);
        });

    });
}

module.exports.textVoice = textVoice;  // 文字转语音