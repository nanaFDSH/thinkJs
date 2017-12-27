const Base = require('./base.js');

module.exports = class extends think.Controller {

  // 设置readis
  async indexAction() {
    await this.cache('name', 'value', {
      type: 'redis',
      redis: {
        timeout: 24 * 60 * 60 * 1000
      }
    });
  }

  // 获取readis
  async getAction() {
    let data = await this.cache('www');
  }
};
