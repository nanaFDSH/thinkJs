const redisCache = require('think-cache-redis');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql'); // mysql
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
};

/**
 * model adapter config mysql
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
    dateStrings: true
  }
};

// mongo
// exports.model = {
//  type: 'mongo',
//  common: {
//    logConnect: true,
//    logger: msg => think.logger.info(msg)
//  },
//  mongo: {
//    host: '127.0.0.1',
//    port: 27017,
//    user: '',
//    password: '',
//    database: 'koa',
//    options: ''
//  }
// }

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
