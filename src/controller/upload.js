const Base = require('./base.js');

module.exports = class extends think.Controller {
    async indexAction() {


        this.assign('title', 'ͼƬ�ϴ�'); //��ģ�帳ֵ
        return this.display();
    }
}