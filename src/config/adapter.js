const redisCache = require('think-cache-redis');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');  // mysql 数据库
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
    type: 'redis',
    common: {
        timeout: 24 * 3600 * 1000 // millisecond
    },
    redis: {
        handle: redisCache,
        port: 6379,
        host: '127.0.0.1',
        password: '123456'
    }
}

/**
 * model adapter config mysql数据库配置
 * @type {Object}
 */
exports.model = {
    type: 'mysql',
    common: {
        logConnect: isDev,
        logSql: isDev,
        logger: msg => think.logger.info(msg)
    },
    mysql: {
        handle: mysql,
        database: 'koa',
        prefix: '',
        encoding: 'utf8',
        host: 'www.hijs.cc',
        port: '3306',
        user: 'koa',
        password: 'qwertyuiop',
        dateStrings: true,
    },
};

// mongo 数据库配置
//exports.model = {
//  type: 'mongo', // 默认使用的类型，调用时可以指定参数切换
//  common: { // 通用配置
//    logConnect: true, // 是否打印数据库连接信息
//    logger: msg => think.logger.info(msg) // 打印信息的 logger
//  },
//  mongo: {
//    host: '127.0.0.1',
//    port: 27017,
//    user: '',
//    password: '',
//    database: 'koa', // 数据库名称
//    options: ''
//  }
//}

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
    type: 'file',
    common: {
        cookie: {
            name: 'thinkjs'
            // keys: ['werwer', 'werwer'],
            // signed: true
        }
    },
    file: {
        handle: fileSession,
        sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
    }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
    type: 'nunjucks',
    common: {
        viewPath: path.join(think.ROOT_PATH, 'view'),
        sep: '_',
        extname: '.html'
    },
    nunjucks: {
        handle: nunjucks
    }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
    type: isDev ? 'console' : 'dateFile',
    console: {
        handle: Console
    },
    file: {
        handle: File,
        backups: 10, // max chunk number
        absolute: true,
        maxLogSize: 50 * 1024, // 50M
        filename: path.join(think.ROOT_PATH, 'logs/app.log')
    },
    dateFile: {
        handle: DateFile,
        level: 'ALL',
        absolute: true,
        pattern: '-yyyy-MM-dd',
        alwaysIncludePattern: true,
        filename: path.join(think.ROOT_PATH, 'logs/app.log')
    }
};
