const Base = require('./base.js');

module.exports = class extends think.Controller {
  async indexAction() {

    // 数据库查询
    let data = await this.model('mongo').select();

    this.assign('data', data);
    return this.display();
  }
};
