const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');

module.exports = [
  view, // make application support view
  model(think.app),
  mongo(think.app), // mogo引用 添加模型的扩展后，会添加方法 think.Model、think.model、ctx.model、controller.model、service.model。
  cache, // 缓存
  session // session
];
