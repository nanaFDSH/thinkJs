const Base = require('./base.js');

module.exports = class extends Base {

  // 获取列表接口
  async listAction() {
    let user = this.model('list'); // controller 里实例化模型
    let data = await user.page(this.get('page')).countSelect({}, true);

    this.assign('data', data); // 给模板赋值
    this.assign('title', '分数表页面'); // 给模板赋值

    return this.display();
  }

  // 删除某条数据
  async deleteAction() {
    let id = this.ctx.post().id;
    let sessName = await this.session('name');  // 如果当前session为undefine 重新登录

    if (typeof sessName === 'undefined') {
      this.body = {
        code: '-1'
      };
    }

    let list = this.model('list'); // controller 里实例化模型
    let data = await list.where({id: ['=', id]}).delete();

    this.body = {
      code: '0'
    };
  }

  // 添加数据
  async addAction() {
    let user = this.ctx.post();
    let list = this.model('list'); // controller 里实例化模型
    let data = await list.add(user);

    this.body = {
      code: '0'
    };
  }

  // 修改数据
  async updateAction() {
    let id = this.ctx.post().id;
    let data = await this.model('list').where({id: id}).select();

    this.body = {
      code: '0',
      data: data[0]
    };
  }

  async submitUpdateAction() {
    let user = this.ctx.post();
    let data = await this.model('list').where({id: user.id}).update(user);

    this.body = {
      code: '0'
    };
  }
};
