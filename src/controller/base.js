module.exports = class extends think.Controller {
  async __before() {
    // 如果当前session为undefine 重新登录
    const sess_name = await this.session('name');
    if(typeof sess_name == 'undefined'){
      this.assign('isLogin', '0'); //给模板赋值
    }else{
      this.assign('name', sess_name); //给模板赋值
      this.assign('isLogin', '1'); //给模板赋值
    }
  }
};
