// miniprogram/pages/admin/join/join.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    tips: '',
    token: ''
  },
  onLoad(options){
    let {token} = options;
    token = "mock token";
    if (!token) {
      wx.showToast({
        title: '参数错误',
        icon: 'none',
        mask: true,
        success() {
          setTimeout(() => {
            console.log('ready back');
            wx.hideToast();
          }, 1000)
        }
      });
      return;
    }
    this.setData({
      token
    });
  },
  handleAction(e) {
    let {action} = e.target.dataset;

    this.sendAction(action);
    // 同意
    if (action === "1") {
      wx.showToast({
        title: '同意参加',
        icon: 'none',
        duration: 1000
      });
    } else {

    }
  },

  sendAction(token, action) {
    console.log('send action to server', action);
  }
});
