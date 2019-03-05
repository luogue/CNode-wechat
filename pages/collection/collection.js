// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collections: [],
    userInfo: null
  },
  // app实例
  app: getApp(),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 还是省略查看其它用户的主页、收藏、回复等功能吧
    // console.log(options)
    // if (options.loginname) {
    //   return this.getCollectiton(options.loginname)
    // }
    
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
        token: token,
        userInfo: userInfo
      })
      if (userInfo) {
        this.getCollectiton(userInfo.loginname)
      }
    } else {
      wx.navigateTo({ url: '../login/login' })
    }
  },
  // 获取收藏列表
  getCollectiton (loginname) {
    let _this = this
    this.app.get({
      url: _this.app.globalData.api.getCollectiton + loginname,
      success (res) {
        if (res.statusCode === 200) {
          _this.setData({
            collections: res.data.data
          })
        }
      }
    })
  },
  // 删除收藏主题
  deCollect (event) {
    if (this.data.token) {
      let _this = this
      this.app.post({
        url: _this.app.globalData.api.deCollect + '?accesstoken=' + _this.data.token,
        data: {
          topic_id: event.currentTarget.dataset.id
        },
        success (res) {
          _this.getCollectiton(_this.data.userInfo.loginname)
        }
      })
    } else {
      wx.navigateTo({ url: '../login/login' })
    }
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