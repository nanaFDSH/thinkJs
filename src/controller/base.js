module.exports = class extends think.Controller {
  async __before() {

    // 如果当前session为undefine 重新登录
    const let = await this.session('name');

    if (typeof sessName === 'undefined') {
      this.assign('isLogin', '0'); // 给模板赋值
    } else {
      this.assign('name', sessName); // 给模板赋值
      this.assign('isLogin', '1'); // 给模板赋值
    }
  }
};
