const Base = require('./base.js');
const Captchapng = require('captchapng');

module.exports = class extends Base {
  // 生成图片验证码
  async indexAction() {
    var code = parseInt(Math.random() * 9000 + 1000); // 验证码
    var p = new Captchapng(80, 30, code); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = Buffer.from(img, 'base64');
    this.ctx.type = 'image/png';
    this.body = imgbase64;
    await this.session('code', code);
  }
};
