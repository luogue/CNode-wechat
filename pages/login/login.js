// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enable: true
  },
  app: getApp(),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 登录
  submit (event) {
    // 我的token
    const token = event.detail.value.token || '35d9048a-dacb-45c3-ac0c-28be4340c8c4'
    let _this = this

    // 验证token
    if (token.length !== 36) {
      this.app.countDown(this)
      this.setData({
        text: '令牌格式错误，应为36位UUID字符串'
      })
    } else {
      let params = {
        accesstoken: token
      }
      // 发送token
      this.app.post({
        url: _this.app.globalData.api.login,
        data: params,
        success (res) {
          if (res.statusCode === 200) {
            _this.app.setStorage({
              key: 'token',
              data: token
            })
            _this.app.setStorage({
              key: 'userInfo',
              data: res.data
            })
            wx.navigateBack()
          }
        },
        fail (res) {
          _this.app.countDown(_this)
          _this.setData({
            text: res.errMsg
          })
        }
      })
    }
  }
})