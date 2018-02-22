const Base = require('./base.js');
const Captchapng = require('captchapng');

module.exports = class extends Base {
  // 生成图片验证码
  async indexAction() {
    const code = parseInt(Math.random() * 9000 + 1000); // 验证码
    const p = new Captchapng(80, 30, code); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    const img = p.getBase64();
    const imgbase64 = Buffer.from(img, 'base64');

    this.ctx.type = 'imgFigure/png'; // 显示图片格式
    this.body = imgbase64; // code 图片

    await this.session('code', code); // session存储
  }
};
