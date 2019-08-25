// miniprogram/pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileId: "cloud://env-qkkql.656e-env-qkkql-1300016576/excel/test.xlsx"
  },

  handleChooseFile: function (){
    if (!wx.canIUse('chooseMessageFile')) {
      wx.showModal({
        title: "提示",
        content: '当前微信版本过低，请升级后使用本功能',
        showCancel: false,
      })
      return
    }
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      extension: [
        'xls', 'xlsx'
      ],
      success: (res) => {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFiles = res.tempFiles;

        const cloudPath = 'excel/' + tempFiles[0].name

        console.log(cloudPath);

        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: tempFiles[0].path,
          success:(res) => {
            console.log(res)
            let {fileID} = res;

            this.setData({
              fileId: fileID
            })
          },
          fail(err){
            console.log(err)
          }
        })
      }
    })
  },
  // 先上传再更新
  handleUpdateData(){
    if(!this.data.fileId){
      wx.showModal({
        title: "提示",
        content: '请先上传文件',
        showCancel: false
      })
      return
    }

    wx.cloud.callFunction({
      name: 'updateRankDataFromFile',
      data: {
        fileId: this.data.fileId
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
})