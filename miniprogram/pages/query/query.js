// miniprogram/pages/query/query.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: ''
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleInputChange(e){
    this.setData({
      name: e.detail.value
    })
  },
  handleQuery(e){
    if(!this.data.name){
      return;
    }
    wx.navigateTo({
      url: "/pages/queryDetail/queryDetail?name="+this.data.name
    });
  }
})