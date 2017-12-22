// Base
const Base = require('./base.js');

module.exports = class extends think.Controller {
  async indexAction() {
    this.assign('title', '添加文章');
    return this.display();
  }
};
