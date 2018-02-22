const Base = require('./base.js');

module.exports = class extends Base {
  // 获取列表接口
  async listAction() {
    const user = this.model('list'); // controller 里实例化模型
    const data = await user.page(this.get('page')).countSelect({}, true);

    this.assign('data', data); // 给模板赋值
    this.assign('title', '分数表页面'); // 给模板赋值

    return this.display();
  }

  // 删除某条数据
  async deleteAction() {
    const id = this.ctx.post().id;
    const sessName = await this.session('name'); // 如果当前session为undefine 重新登录

    if (typeof sessName === 'undefined') {
      this.body = {
        code: '-1'
      };
    }

    const list = this.model('list'); // controller 里实例化模型
    const data = await list.where({id: ['=', id]}).delete();

    this.body = {
      code: '0'
    };
  }

  // 添加数据
  async addAction() {
    const user = this.ctx.post();
    const list = this.model('list'); // controller 里实例化模型
    const data = await list.add(user);

    this.body = {
      code: '0'
    };
  }

  // 修改数据
  async updateAction() {
    const id = this.ctx.post().id;
    const data = await this.model('list').where({id: id}).select();

    this.body = {
      code: '0',
      data: data[0]
    };
  }

  async submitUpdateAction() {
    const user = this.ctx.post();
    const data = await this.model('list').where({id: user.id}).update(user);

    this.body = {
      code: '0'
    };
  }
};
