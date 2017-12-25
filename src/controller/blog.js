const Base = require('./base.js');

module.exports = class extends think.Controller {
  async indexAction() {
    const mongo = this.model('mongo'); // controller 引入mogo包

    const data = await mongo.select();

    this.assign('data', data);

    return this.display();
  }
};
