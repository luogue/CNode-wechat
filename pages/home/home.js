// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topics: {
      all: {
        list: [],
        page: 1,
        limit: 10
      },
      good: {
        list: [],
        page: 1,
        limit: 10
      },
      share: {
        list: [],
        page: 1,
        limit: 10
      },
      ask: {
        list: [],
        page: 1,
        limit: 10
      },
      job: {
        list: [],
        page: 1,
        limit: 10
      },
      dev: {
        list: [],
        page: 1,
        limit: 10
      }
    },
    // 这种需要根据current来选择tabs，不适合放到wxs, 每次changeTab都要在js-wxml-wxs三者之间进行交互，太麻烦
    tabs: [{
      tab: 'all',
      name: '全部'
    }, {
      tab: 'good',
      name: '精华'
    }, {
      tab: 'share',
      name: '分享'
    }, {
      tab: 'ask',
      name: '问答'
    }, {
      tab: 'job',
      name: '招聘'
    }, {
      tab: 'dev',
      name: '测试'
    }],
    currentTabIndex: 0,
    tab: 'all',
    pulldownIsReady: true,
    pullupIsReady: true
  },
  // app实例
  app: getApp(),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置tab
    this.setData({ tab: options.tab || 'all' })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    let _this = this
    let result = this.app.getStorage({
      key: 'topics',
      success (res) {
        _this.setData({
          topics: res.data
        })
      },
      fail (err) {
        /** 
         * 如果没有缓存数据，那么会调用fail函数，此时再请求数据
         * 放到onLoad里的时候，onLoad是比onShow先执行的
         * onShow还没执行onLoad就调用了getTopics，所以没法判断数据是否存在
         */
        const OPERARTION_TYPE = 'INIT'
        _this.getTopics(OPERARTION_TYPE)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    this.app.setStorage({
      key: 'topics',
      data: this.data.topics
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
  
  },
  printf () {
    // console.log(this.data.topics)
  },
  // 获取当前主题
  getCurrentTopic () {
    return this.data.topics[this.data.tab]
  },
  // 获取主题列表
  getTopics (OPERATION_TYPE) {
    // 如果目标tab已经有缓存数据，点击切换tab和swiper切换tab时不请求数据
    let topic = this.getCurrentTopic()
    if ((OPERATION_TYPE === 'CHANGE_TAB' || OPERATION_TYPE === 'CHANGE_TAB') && topic.list.length > 0) {
      return
    }

    let params = {
      tab: this.data.tab,
      page: topic.page,
      limit: topic.limit,
      // mdrender: true // 默认为true，渲染出现的所有markdown格式文本
    }
    let _this = this

    this.app.get({
      url: _this.app.globalData.api.getTopics,
      data: params,
      success (res) {
        if (res.statusCode === 200) {
          switch (OPERATION_TYPE) {
            // 下拉刷新需要重置数组
            case 'PULL_DOWN':
              // 防止刷新过于频繁
              setTimeout(() => {
                _this.setData({
                  topics: {
                    ..._this.data.topics,
                    [_this.data.tab]: {
                      list: res.data.data,
                      page: 1,
                      limit: 10
                    }
                  },
                  pulldownIsReady: true
                })
              }, 2000)
              break
            // 上拉刷新需要添加进数组
            case 'PULL_UP':
              // 防止刷新过于频繁
              setTimeout(() => {
                _this.setData({
                  topics: {
                    ..._this.data.topics,
                    [_this.data.tab]: {
                      list: topic.list.concat(res.data.data),
                      page: topic.page,
                      limit: topic.limit
                    }
                  },
                  pullupIsReady: true
                })
              }, 2000)
              break
            case 'INIT':
              // 如果是初次显示，那么需要快速渲染，不用防止刷新过于频繁
              _this.setData({
                topics: {
                  ..._this.data.topics,
                  [_this.data.tab]: {
                    list: topic.list.concat(res.data.data),
                    page: topic.page,
                    limit: topic.limit || 10
                  }
                }
              })
              break
            case 'CHANGE_TAB':
              // 如果是初次显示，那么需要快速渲染，不用防止刷新过于频繁
              _this.setData({
                topics: {
                  ..._this.data.topics,
                  [_this.data.tab]: {
                    list: topic.list.concat(res.data.data),
                    page: topic.page,
                    limit: topic.limit || 10
                  }
                }
              })
              break
            default:
              console.log('未匹配到渲染数据')
          }
        }
      },
      fail (res) {
        _this.setData({
          pulldownIsReady: true,
          pullupIsReady: true
        })
      }
    })
  },
  // 点击切换tab
  selectTab (event) {
    this.setData({
      tab: event.currentTarget.dataset.item.tab,
      currentTabIndex: event.currentTarget.dataset.item.current
    })
  },
  // swiper切换tab，点击切换tab也会调用这里
  changeTab (event) {
    // 如果目标tab已经有缓存数据，点击切换tab和swiper切换tab时不请求数据
    const OPERATION_TYPE = 'CHANGE_TAB'
    this.setData({
      tab: this.data.tabs[event.detail.current].tab
    })
    this.getTopics(OPERATION_TYPE)
  },
  // 进入主题详情
  getTopic (event) {
    wx.navigateTo({
      url: '../topic/topic?id=' + event.currentTarget.dataset.topic.id
    })
  },
  // 下拉刷新
  pulldownUpate () {
    if (this.data.pulldownIsReady) {
      this.setData({
        topics: {
          ...this.data.topics,
          [this.data.tab]: {
            ...this.data.topics[this.data.tab],
            page: 1
          }
        },
        pulldownIsReady: false
      })

      const OPERATION_TYPE = 'PULL_DOWN'
      this.getTopics(OPERATION_TYPE)
    }
  },
  // 上拉刷新
  pullupUpdate () {
    if (this.data.pullupIsReady) {
      this.setData({
        topics: {
          ...this.data.topics,
          [this.data.tab]: {
            ...this.data.topics[this.data.tab],
            page: this.data.topics[this.data.tab].page + 1
          }
        },
        pullupIsReady: false
      })

      const OPERATION_TYPE = 'PULL_UP'
      this.getTopics(OPERATION_TYPE)
    }
  }
})