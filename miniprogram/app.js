//app.js
App({
  data(){
    systemInfo: {}
  },
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true
    });

    let info = wx.getSystemInfoSync();

    this.data.systemInfo = info;
  }
})
