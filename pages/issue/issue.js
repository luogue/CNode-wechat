// pages/issue/issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      {
        name: '测试',
        value: 'dev',
        checked: true
      }, {
        name: '分享',
        value: 'share'
      }, {
        name: '问答',
        value: 'ask'
      }, {
        name: '招聘',
        value: 'job'
      }
    ]
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
    let token = this.app.getToken()
    if (token) {
      this.setData({
        token: token
      })
    } else {
      wx.navigateTo({ url: '../login/login' })
    }
  },
  // 发布
  issue (event) {
    console.log(event)
    let topic = event.detail.value
    
    // 标题5个字符以上
    if (topic.title.length < 5) {
      this.app.countDown(this)
      this.setData({
        text: '标题5个字符以上'
      })
      return
    }

    // 内容不能为空
    if (topic.content.length === 0) {
      this.app.countDown(this)
      this.setData({
        text: '内容不能为空'
      })
      return
    }

    let _this = this
    this.app.post({
      url: this.app.globalData.api.issue + '?accesstoken=' + this.data.token,
      data: {
        accesstoken: this.data.token,
        title: topic.title,
        tab: topic.type,
        content: topic.content
      },
      success (res) {
        console.log(res)
        if (res.statusCode === 200) {
          _this.app.removeStorage({
            key: 'topics'
          })
          wx.navigateTo({
            url: '../topic/topic?id=' + res.data.topic_id
          })
        }
      }
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