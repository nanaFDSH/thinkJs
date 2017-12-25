const Base = require('./base.js');

module.exports = class extends think.Controller {
  async indexAction() {
    const mongo = this.model('mongo'); // controller ��ʵ����ģ��
    const data = await mongo.select();
    this.assign('data', data); // ��ģ�帳ֵ

    return this.display();
  }
};
