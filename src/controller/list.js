const Base = require('./base.js');

module.exports = class extends Base {
    async listAction()
    {
        const user = this.model('list'); // controller 里实例化模型
        //const data = await user.select();
        let data = await user.page(this.get('page')).countSelect({},true);
        console.log(data)
        this.assign('data', data); //给模板赋值
        this.assign('title', '分数表页面'); //给模板赋值

        return this.display();
    }

    async deleteAction()
    {
        var id = this.ctx.request.body.post.id
        // 如果当前session为undefine 重新登录
        const sess_name = await this.session('name');
        if(typeof sess_name == 'undefined'){
            return this.body = {
                code : '-1'
            };
        }

        const list = this.model('list'); // controller 里实例化模型
        const data = await list.where({id: ['=', id]}).delete();
        this.body = {
            code : '0'
        };
    }

    async addAction()
    {
        var user = this.ctx.request.body.post

        const list = this.model('list'); // controller 里实例化模型
        const data = await list.add(user);
        this.body = {
            code : '0'
        };
    }

};
