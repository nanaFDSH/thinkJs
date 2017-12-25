const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');

module.exports = [
  view, // make application support view
  model(think.app),
  mongo(think.app), // mogo引用
  cache, // 缓存
  session // session
];
