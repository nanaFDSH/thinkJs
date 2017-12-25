const Base = require('./base.js');

const circle = require('./tool/text');  // 测试封装

module.exports = class extends Base {
  async indexAction() {

    console.log('圆面积：' + circle.area(4));
    console.log('圆周长：' + circle.circumference(14));

    this.assign('title', '首页'); // 给模板赋值
    return this.display();
  }
};
