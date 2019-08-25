// 云函数入口文件
const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx').default;

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const res = await cloud.downloadFile({
    fileID: event.fileId
  })
  let {fileContent} = res;
  let workSheets = xlsx.parse(fileContent);

  let data = workSheets[0].data;
  data.shift();

  let updateResult = [];

  for(let i = 0; i < data.length; i++){
    let item = data[i];
    let res = insertOrUpdateRankData({
      name: item[0],
      credit: item[1]
    })
    updateResult.push(res);
  }
  return {
    updateResult: updateResult,
    openid: wxContext.OPENID
  }
}

async function insertOrUpdateRankData (data){
  let {name, credit} = data;
  let doc = await db.collection("rank").where({
    name: name
  }).get();
  if(!doc){
    console.log('not exists')
    return await db.collection("rank").add({
      data: {
        name, credit
      }
    })
  }else{
    // update
    console.log('exists, update')
    return await db.collection("rank")
      .where({
        name: name
      })
      .update({
        name, credit
      })
  }
}