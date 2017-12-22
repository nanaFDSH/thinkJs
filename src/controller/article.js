// Base
const Base = require('./base.js');

module.exports = class extends think.Controller {

  async indexAction() {

    this.assign('title', '文章列表');
    return this.display();
  }

  async editAction() {

    this.assign('title', '添加文章');
    return this.display();
  }

};
