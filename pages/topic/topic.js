Page({
  data: {
    token: null,
    id: null,
    topic: null,
    userInfo: null,
    replyList: [],
    collections: [],
    focus: false,
    isCollected: false,
    defaultContent: null,
    // 回复评论
    currentComment: null,
    comment: null,
    isReplyComment: false
  },
  // app实例
  app: getApp(),
  onLoad (option) {
    this.getTopic(option.id)
    this.setData({
      id: option.id
    })
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
    }
  },
  // 获取主题详情
  getTopic (id) {
    let _this = this
    this.app.get({
      url: _this.app.globalData.api.getTopic + id,
      success (res) {
        if (res.statusCode === 200) {
          let WxParse = require('../../wxParse/wxParse.js')
          WxParse.wxParse('content', 'html', res.data.data.content, _this, 5)
          let replyList = []
          for (let i = 0, len = res.data.data.replies.length; i < len; i++) {
            replyList.push(res.data.data.replies[i].content)
          }
          for (let i = 0, len = replyList.length; i < len; i++) {
            WxParse.wxParse('reply' + i, 'html', replyList[i], _this)
            if (i === replyList.length - 1) {
              WxParse.wxParseTemArray('replyTemArray', 'reply', replyList.length, _this)
            }
          }
          _this.setData({
            topic: res.data.data,
            replyList
          })
        }
      }
    })
  },
  // 获取收藏列表
  getCollectiton (loginname) {
    let _this = this
    this.app.get({
      url: _this.app.globalData.api.getCollectiton + loginname,
      success(res) {
        let result = res.data.data.find(item => {
          return item.id === _this.data.topic.id
        })
        if (res.statusCode === 200) {
          _this.setData({
            collections: res.data.data,
            isCollected: result
          })
        }
      }
    })
  },
  // 收藏主题
  collect (event) {
    if (this.data.token) {
      let _this = this
      this.app.post({
        url: _this.app.globalData.api.collect + '?accesstoken=' + _this.data.token,
        data: {
          topic_id: event.currentTarget.dataset.id
        },
        success (res) {
          _this.setData({ 
            isCollected: true
           })
        }
      })
    } else {
      wx.navigateTo({ url: '../login/login' })
    }
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
        success(res) {
          _this.setData({
            isCollected: false
          })
        }
      })
    } else {
      wx.navigateTo({ url: '../login/login' })
    }
  },
  // 点赞或取消赞
  agree (option) {
    // 判断是否登录
    if (this.data.token) {
      let _this = this
      this.app.post({
        url: _this.app.globalData.api.agree + option.currentTarget.dataset.payload.id + '/ups?accesstoken=' + _this.data.token,
        success (res) {
          if (res.statusCode === 200) {
            // 重新请求数据性能开销太大了，改为更新现有数据吧
            // _this.getTopic(_this.data.id)
            let topic = _this.data.topic
            if (res.data.action === 'up') {
              topic.replies.forEach(item => {
                if (item.id === option.currentTarget.dataset.payload.id) {
                  item.ups.push(_this.data.userInfo.id)
                }
              })
            } else if (res.data.action === 'down') {
              topic.replies.forEach(item => {
                if (item.id === option.currentTarget.dataset.payload.id) {
                  let result = _this.app.removeItem(item.ups, _this.data.userInfo.id)
                }
              })
            }
            _this.setData({
              topic: topic
            })
          }
        }
      })
    } else {
      wx.navigateTo({ url: '../login/login' })
    }
  },
  // 获得焦点时变大，失去焦点时变小
  setTextarea (event) {
    if (event.type === 'focus') {
      this.setData({
        focus: true
      })
    } else {
      this.setData({
        focus: false
      })
    }
  },
  // 评论
  reply (event) {
    let params = {
      accesstoken: this.data.token,
      content: event.detail.value.content
    }
    let _this = this
    this.app.post({
      url: this.app.globalData.api.comment + this.data.id + '/replies/?accesstoken=' + this.data.token,
      data: params,
      success (res) {
        if (res.statusCode === 200) {
          _this.setData({
            defaultContent: ''
          })
          _this.getTopic(_this.data.id)
        }
      }
    })
  },
  // 回复别人的评论
  replyOther (event) {
    this.setData({
      isReplyComment: true,
      currentComment: event.currentTarget.dataset.item,
      comment: '@' + event.currentTarget.dataset.item.author.loginname + ' '
    })
  },
  // 提交评论回复
  replyComment (event) {
    let params = {
      accesstoken: this.data.token,
      content: event.detail.value.comment,
      reply_id: event.currentTarget.dataset.id
    }
    let _this = this
    this.app.post({
      url: this.app.globalData.api.comment + this.data.id + '/replies/?accesstoken=' + this.data.token,
      data: params,
      success(res) {
        if (res.statusCode === 200) {
          _this.setData({
            isReplyComment: false
          })
          _this.getTopic(_this.data.id)
        }
      }
    })
  },
  // 取消评论回复
  cancel () {
    this.setData({
      isReplyComment: false
    })
  }
})