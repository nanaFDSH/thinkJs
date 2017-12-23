const Base = require('./base.js');
const fs = require('fs');
var AipSpeechClient = require("baidu-aip-sdk").speech;



module.exports = class extends Base {
    async indexAction() {
        this.assign('title', '首页'); // 给模板赋值
        return this.display();
    }

    async speakAction(){

        let text = this.ctx.post().text

        // 设置APPID/AK/SK
        var APP_ID = this.config('ai').app_id;
        var API_KEY = this.config('ai').api_key;
        var SECRET_KEY = this.config('ai').secret_key;

        // 新建一个对象，建议只保存一个对象调用服务接口
        var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

        // 语音合成
        client.text2audio(text).then(function(result) {
            if (result.data) {
                console.log(result.data)
                fs.writeFileSync(__dirname + '/../../www/static/audio/'+'ai.mpVoice.mp3', result.data);
            } else {
                // 服务发生错误
                console.log(result)
            }
        }, function(e) {
            // 发生网络错误
            console.log(e)
        });

    }


};
