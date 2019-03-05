Page({
  data: {
    a: 1,
    news: null,
    replyList: []
  },
  app: getApp(),
  // 生命周期函数--监听页面加载
  onShow () {
    let token = this.app.getToken()
    if (!token) {
      wx.navigateTo({ url: '../login/login' })
    } else {
      let _this = this
      this.app.get({
        url: _this.app.globalData.api.getMessages + token,
        success (res) {
          console.log(res)
          if (res.statusCode === 200) {
            let WxParse = require('../../wxParse/wxParse.js')
            let list = res.data.data.hasnot_read_messages.concat(res.data.data.has_read_messages)
            let replyList = []
            for (let i = 0, len = list.length; i < len; i++) {
              replyList.push(list[i].reply.content)
            }
            for (let i = 0, len = replyList.length; i < len; i++) {
              WxParse.wxParse('reply' + i, 'html', replyList[i], _this)
              if (i === replyList.length - 1) {
                WxParse.wxParseTemArray('replyTemArray', 'reply', replyList.length, _this)
              }
            }
            _this.setData({
              news: list,
              replyList
            })
          }
        }
      })
    }
  },
  // 进入主题详情
  getTopic (event) {
    console.log(event)
    wx.navigateTo({
      url: '../topic/topic?id=' + event.currentTarget.dataset.topic.topic.id
    })
  },
})