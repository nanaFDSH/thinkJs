const Base = require('./base.js');
module.exports = class extends Base {
    async indexAction() {
        this.assign('title', 'thinkjs'); //给模板赋值
        return this.display();
    }
}