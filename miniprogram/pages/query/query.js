// miniprogram/pages/query/query.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    isWxWork: false
  },

  onShow(){
    let info = getApp().data.systemInfo;
    
    if(info.environment === "wxwork"){
      this.setData({
        isWxWork: true
      })
    }
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
  handleManageBtn(){
    wx.navigateTo({
      url: "/pages/admin/admin"
    });
  },
  handleQuery(e){
    if(!this.data.name){
      return;
    }
    wx.navigateTo({
      url: "/pages/queryDetail/queryDetail?name="+this.data.name
    });
  },
  handleQyLogin(){
    wx.qy.login({
      success: function(res){
        // success
        console.log(res)

        wx.qy.getEnterpriseUserInfo ({
          success: function(res) {
            var userInfo = res.userInfo
            var name = userInfo.name
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
          }
        })
      },
      fail: function() {
        // fail
        console.log('failed')
      },
      complete: function() {
        // complete
      }
    })
  }
})