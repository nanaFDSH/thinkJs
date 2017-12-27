const Base = require('./base.js');
const fs = require('fs');
const IdCard = require('./tool/aiIcard')

module.exports = class extends Base {

    async indexAction() {
        this.assign('title', '首页'); // 给模板赋值
        return this.display();
    }

    async speakAction(){
        let AipSpeechClient = require("baidu-aip-sdk").speech;

        // 设置APPID/AK/SK
        let APP_ID = this.config('ai').app_id;
        let API_KEY = this.config('ai').api_key;
        let SECRET_KEY = this.config('ai').secret_key;

        // 新建一个对象，建议只保存一个对象调用服务接口
        let client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
        let text = this.ctx.post().text;
        console.log(AipSpeechClient)
        console.log(client)
        // 语音合成
        client.text2audio(text).then(function(result) {
            if (result.data) {
                // console.log(result.data);
                fs.writeFileSync(__dirname + '../../../www/static/audio/'+'ai.mpVoice.mp3', result.data);
            } else {
                // 服务发生错误
                console.log(result);
            }
        }, function(e) {
            // 发生网络错误
            console.log(e);
        });

    }

    // 身份证识别
    async recognizeAction(){

        let image = fs.readFileSync(__dirname + "../../../www/static/upload/id1.jpg").toString("base64");
        let idCardSide = "front";  // front - 身份证正面 back - 身份证背面
        let options = {};    // 如果有可选参数
        options["detect_direction"] = "true";
        options["detect_risk"] = "false";

        let data = await IdCard.recognizeIdCard(image, idCardSide, options);
        console.log(data)
        this.body = data
    }
};
