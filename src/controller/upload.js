const Base = require('./base.js');

module.exports = class extends think.Controller {
    async indexAction() {


        this.assign('title', '图片上传'); //给模板赋值
        return this.display();
    }
}