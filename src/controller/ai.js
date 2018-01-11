const Base = require('./base.js');
const fs = require('fs');
const aiVoice = require('./tool/aiVoice');
const aiIcard = require('./tool/aiIcard');
const path = require('path');

module.exports = class extends Base {

    async indexAction() {
        this.assign('title', '首页'); // 给模板赋值
        return this.display();
    }

    // 文字转语音
    async speakAction(){
        let text = this.ctx.post().text;
        let data = await aiVoice.textVoice(text);  // base64
        let voice = fs.writeFileSync(__dirname + '/../../www/static/audio/'+'ai.mpVoice.mp3', data);
    }

    // 身份证识别
    async recognizeAction(){

        let file = this.ctx.file('idImage')  // 获取file的name

        // 读取信息
        let image = fs.readFileSync(file.path).toString("base64");
        let idCardSide = "front";  // front - 身份证正面 back - 身份证背面
        let options = {};    // 如果有可选参数
        options["detect_direction"] = "true";
        options["detect_risk"] = "false";
        let data = await aiIcard.recognizeIdCard(image, idCardSide, options);

        if(think.isEmpty(data)){
            this.body = {
                code : -1
            }
        }else {
            this.body = {
                code : 0,
                data:{
                    imageUrl:image,
                    idCardInfo:data
                }
            }
        }
    }
};
