// miniprogram/pages/queryDetail/queryDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    rank: '',
    topList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.name){
      this.setData({
        name: options.name
      })

      wx.showLoading({
        content: "查询中"
      });
      wx.cloud.callFunction({
        name: 'rank',
        data: {
          name: this.data.name
        }
      }).then(res => {
        console.log(res)
        if(!res.result || !res.result.rank){
          wx.hideLoading();
          wx.showToast({
            title: "查询不到排名信息",
            icon: "none",
            duration: 1500
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500);
        }else{
          this.setData({
            rank: res.result.rank
          })
        }

        
      }).catch(err => {
        console.log(err)
      }).finally(()=>{
        wx.hideLoading();
      })
    }else{
      wx.showModal({
        title: "提示",
        content: "数据错误",
        showCancel: false,
        success(res) {
          wx.navigateBack();
        }
      })
    }
  },
  onShow: function(){
    this.getTopN();
  },
  getTopN(n = 10){
    wx.cloud.callFunction({
      name: 'queryRankNList',
      data: {
        n: n
      }
    }).then(res => {
      console.log(res);
      let {result} = res;
      this.setData({
        topList: result.rankList.data
      })
    }).catch(err => {
      console.log(err);
    })
  }
})