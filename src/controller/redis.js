const Base = require('./base.js');

module.exports = class extends think.Controller {
    // …Ë÷√readis
    async indexAction() {
        await this.cache('name', 'value', {
            type: 'redis',
            redis: {
                timeout: 24 * 60 * 60 * 1000
            }
        });
    }

    // ªÒ»°readis
    async getAction() {
        const data = await this.cache('dawangba');
        console.log(data)
    }
}