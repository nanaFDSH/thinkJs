const Base = require('./base.js');

module.exports = class extends Base {

  // 登录
  async loginAction(){

    if(this.method == 'GET'){
      return this.display()
    }else if(this.method == 'POST'){

      const code = await this.session('code');

      if(this.ctx.request.body.post.code != code){
        this.assign('errorMsg','验证码错误');
        this.display();
      }else{
        var
            name = this.ctx.request.body.post.name || '',
            password = this.ctx.request.body.post.password || '';

        let res = await this.model('users').where({name: name,password:password}).select();

        if(think.isEmpty(res)) {
          // 查不到数据 内容为空时的处理
          this.assign('errorMsg','用户名或密码错误');
          this.display();
        }else{
          console.log('signin ok!');
          await this.session('name', name);
          this.ctx.redirect('/index/index'); // 重定向
        }
      }

    }
  }

  // 退出登录
  async logoutAction() {
    await this.session(null);
    await this.cookie('thinkjs', null)
    this.ctx.redirect('/list/list'); // 重定向
  }

  // 用户信息
  async messageAction() {
    const data = await this.model('users').select();
    console.log(data)
    this.assign('data', data); //给模板赋值
    //this.assign('title', '用户页面'); //给模板赋值

    return this.display();
  }
};
