const Base = require('./base.js');

module.exports = class extends Base {

    // 登录
    async loginAction() {
        return this.display();
    }

    // 用户信息登录
    async userloginAction(){
        // 获取存储的验证码
        let code = await this.session('code');

        if (parseInt(this.ctx.post().code) === code) {
            let name = this.ctx.post().name || '';
            let password = this.ctx.post().password || '';
            let res = await this.model('users').where({name: name, password: password}).select();

            // 查不到数据 内容为空时的处理
            if (think.isEmpty(res)) {
                this.body = {
                    code: -1,
                    msg: '用户名或密码错误'
                }
            } else {
                await this.session('name', name);
                const cookie = this.cookie('thinkjs');

                this.body = {
                    code: 0,
                    msg: '登陆成功'
                }
            }
        } else {
            this.body = {
                code: -1,
                msg: '验证码错误'
            }
        }
    }

    // 用户信息注册
    async registeredAction() {
        if (this.method === 'GET') {
            return this.display();
        } else {
            // 获取验证码
            let code = await this.session('code');

            // 验证码输入不正确
            if (this.ctx.post().code != code) {

                this.body = {
                    code: -1,
                    msg: '验证码错误'
                }
            } else {
                let name = this.ctx.post().name;
                let password = this.ctx.post().password;
                let rPassword = this.ctx.post().r_password;

                let User = this.model('users');
                let data = await User.where({name: name}).find();

                // 如果名字不存在
                if (think.isEmpty(data)) {
                    // 内容为空时的处理

                    if (password === rPassword) {
                        let insertId = await User.add({
                            name: name,
                            password: password,
                            headImg: 'http://img1.hijs.cc/B924B4A0-AFF1-41B7-9D57-C0BD290562C2.png?imageView2/0/w/250/h/240'
                        });

                        this.body = {
                            code: 0,
                            msg: '注册成功'
                        }

                    } else {
                        this.body = {
                            code: -1,
                            msg: '重复输入密码错误'
                        }
                    }
                } else {
                    this.body = {
                        code: -1,
                        msg: '该名字已经注册'
                    }
                }
            }
        }
    }

    // 注册用户名字信息验证
    async checkNameAction() {
        let name = this.ctx.post().name;
        let data = await this.model('users').where({name: name}).select();

        if (think.isEmpty(data)) {
            // 内容为空时的处理
            this.body = true;
        } else {
            this.body = false;
        }
    }

    // 登录用户名字信息验证
    async checkNameLogAction() {
        let name = this.ctx.post().name;
        let data = await this.model('users').where({name: name}).select();

        if (think.isEmpty(data)) { // 不存在
            // 内容为空时的处理
            this.body = false;
        } else {  // 存在
            this.body = true;
        }
    }

    // 退出登录
    async logoutAction() {
        await this.session(null);   // session cookie 均设置为空
        await this.cookie('thinkjs', null);
        this.ctx.redirect('/'); // 重定向
    }

    // 获取当前用户信息
    async messageAction() {
        let name = await this.session('name');
        let data = await this.model('users').where({name: name}).select();
        this.assign('data', data[0]); // 给模板赋值
        return this.display();
    }

    // 提交修改当前用户信息
    async editAction() {
        let name = await this.session('name');
        let img = this.ctx.post().img;
        let affectedRows = await this.model('users').where({name: name}).update({headImg: img});

        // affectedRows 被修改的行数
        if (affectedRows) {
            this.body = {
                code: 0
            };
        } else {
            this.body = {
                code: -1
            };
        }
    }

};
