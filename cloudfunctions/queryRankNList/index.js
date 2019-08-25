// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let { n = 10 } = event;

  let result = await db.collection('rank').orderBy('credit', 'desc').limit(n).get();
  return {
    rankList: result
  }
}