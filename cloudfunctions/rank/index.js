// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

const rankDB = db.collection('rank');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let {name} = event;
  let result = await rankDB.where({
    name
  }).get();
  let user = null;
  if (result.data.length === 0){
    return null;
  }
  user = result.data[0];

  let coutResult = await rankDB.orderBy('credit', 'desc').where({
    credit: _.gte(user.credit)
  }).count();

  return {
    rank: coutResult.total,
    openid: wxContext.OPENID,
  }
}