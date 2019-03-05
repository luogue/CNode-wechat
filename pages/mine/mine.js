// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  onShow () {
    let token = this.app.getToken()
    if (token) {
      let userInfo = this.app.getStorageSync('userInfo')
      this.setData({
        token: token
      })
      this.getUserInfo(userInfo.loginname)
    } else {
      wx.navigateTo({ url: '../login/login' })
    }
  },
  getUserInfo (loginname) {
    let _this = this
    this.app.get({
      url: this.app.globalData.api.getUserInfo + loginname,
      success(res) {
        console.log(res)
        _this.setData({
          userInfo: res.data.data
        })
      }
    })
  },
  // 导航到我发部过的主题
  showMyIssues () {
    this.app.setStorage({
      key: 'issues',
      data: this.data.userInfo.recent_topics,
      success (res) {
        console.log(res)
        // wx.navigateTo({ url: '../myIssues/myIssues' })

        wx.navigateTo({ url: '../myIssues/myIssues' })
      }
    })
  },
  // 发布
  issue () {
    wx.navigateTo({ url: '../issue/issue' })
  },
  // 退出
  logout () {
    // 清除缓存
    wx.clearStorage()
    wx.navigateTo({ url: '../login/login' })
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
  // onShareAppMessage: function () {
  
  // }
})