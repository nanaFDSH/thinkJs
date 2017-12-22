const Base = require('./base.js');

module.exports = class extends Base {

  // 登录
  async loginAction(){

    if(this.method == 'GET'){
      return this.display()
    }else if(this.method == 'POST'){

      // 获取存储的验证码
      const code = await this.session('code');

      if(this.ctx.post().code != code){
        this.assign('errorMsg','验证码错误');
        this.display();
      }else{
        var
            name = this.ctx.post().name || '',
            password = this.ctx.post().password || '';

        let res = await this.model('users').where({name: name,password:password}).select();

        // 查不到数据 内容为空时的处理
        if(think.isEmpty(res)) {
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
    // session cookie 均设置为空
    await this.session(null);
    await this.cookie('thinkjs', null)
    this.ctx.redirect('/'); // 重定向
  }

  // 获取当前用户信息
  async messageAction() {
    const name = await this.session('name');
    const data = await this.model('users').where({name: name}).select();
    console.log(data)
    this.assign('data', data[0]); //给模板赋值
    return this.display();
  }

  // 提交修改当前用户信息
  async editAction() {

      const name = await this.session('name')

      const img = this.ctx.post().img;

      const affectedRows = await this.model('users').where({name: name}).update({headImg: img});

      // affectedRows 被修改的行数
      if(affectedRows){
        this.body = {
          code : 0
        }
      }else {
        this.body = {
          code : -1
        }
      }

  }

  // 用户信息注册
  async registeredAction(){

    if (this.method == 'GET') {

      return this.display();

    } else {

      // 获取验证码
      const code = await this.session('code')

      // 验证码输入不正确
      if (this.ctx.post().code != code) {
        this.assign('errorMsg', '验证码错误');
        this.display();
      } else {
        var
            name = this.ctx.post().name,
            password = this.ctx.post().password,
            r_password = this.ctx.post().r_password;

        let User = this.model('users');

        let data = await  User.where({name: name}).find();

        // 如果名字不存在
        if (think.isEmpty(data)) {
          // 内容为空时的处理

          if (password === r_password) {
            let insertId = await User.add({
                name: name,
                password: password,
                headImg: 'http://img1.hijs.cc/B924B4A0-AFF1-41B7-9D57-C0BD290562C2.png?imageView2/0/w/250/h/240'
            });

            console.log(insertId)
            this.ctx.redirect('/user/login'); // 返回登录页
          } else {
            this.assign('errorMsg', '重复输入密码错误');
            this.display();
          }

        } else {
          this.assign('errorMsg', '该名字已经注册');
          this.display();
        }
      }
    }
  }

};
