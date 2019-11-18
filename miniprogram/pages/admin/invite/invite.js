// miniprogram/pages/admin/invite/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '1231232131',
    img: null,
    inviteUsers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true
    });

    this.requestQRcode();
  },

  onShow() {
    const db = wx.cloud.database();

    const watcher = db.collection('admin_invite').where({
      token: "1231232131"
    }).watch({
      onChange: (snapshot) => {
        console.log('snapshot', snapshot);
        this.setData({
          inviteUsers: snapshot.docs[0].users
        })
      },
      onError: function(err) {
        console.error('the watch closed because of error', err)
      }
    })

  },

  requestQRcode() {
    wx.cloud.callFunction({
      name: 'createQRcode',
      data: {
        path: 'pages/admin/join/join?token=' + this.data.token,
      }
    }).then(res => {
      const {result} = res;
      console.log(result.result);


      this.setData({
        img: 'data:' + result.result.contentType + ';base64,' + wx.arrayBufferToBase64(result.result.buffer)
      })

    });
  }
});
