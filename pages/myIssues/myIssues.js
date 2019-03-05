// pages/myIssues/myIssues.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topics: []
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
    let _this = this
    this.app.getStorage({
      key: 'issues',
      success (res) {
        console.log(res)
        _this.setData({
          topics: res.data
        })
      }
    })
  },
  // 进入主题详情
  getTopic (event) {
    wx.navigateTo({
      url: '../topic/topic?id=' + event.currentTarget.dataset.topic.id
    })
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
  
  }
})