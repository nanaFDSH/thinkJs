const Base = require('./base.js');

module.exports = class extends think.Controller {
    async indexAction() {
        const mongo = this.model('mongo'); // controller 里实例化模型
        let data = await mongo.select();
        this.assign('data', data); //给模板赋值

        return this.display();
    }
}