// 实例化模型类，获取配置后调用 think.model 方法，多模块项目下会获取当前模块下的配置。
module.exports = class extends think.Controller {
  async indexAction() {
    const mogo = this.model('mongo'); // controller 里实例化模型
    const data = await mogo.select(); // 数据库查询

    this.assign('data', data);
    return this.display();
  }
};
