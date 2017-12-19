const Base = require('./base.js');

module.exports = class extends think.Controller {
    // 设置readis
    async indexAction() {
        await this.cache('name', 'value', {
            type: 'redis',
            redis: {
                timeout: 24 * 60 * 60 * 1000
            }
        });
    }

    // 获取readis
    async getAction() {
        const data = await this.cache('www');
        console.log(data)
    }
}