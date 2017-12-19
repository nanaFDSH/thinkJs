const Base = require('./base.js');

module.exports = class extends Base {
    async indexAction() {
        this.assign('title', '图片上传');
        return this.display();
    }
}