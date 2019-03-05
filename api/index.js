module.exports = {
  // 主题列表
  getTopics: 'https://cnodejs.org/api/v1/topics', // 获取主题列表，参数为?tab=all&page=1&limit=10

  // 主题详情
  getTopic: 'https://cnodejs.org/api/v1/topic/', // 获取主题详情，参数为/:id
  getCollections: 'https://cnodejs.org/api/v1/topic_collect', // 获取用户收藏列表，参数为/:userName
  agree: 'https://cnodejs.org/api/v1/reply/', // 点赞，参数为/:replyId + '/ups?accesstoken='
  /**
   * params参数为 {
   *   accesstoken: token,
   *   content: comment, // 评论内容
   *   reply_id: id // 回复其他人的id 
   * }
   */
  comment: 'https://cnodejs.org/api/v1/topic/', // 评论，参数为/:id + '/replies/?accesstoken='
  getCollectiton: 'https://cnodejs.org/api/v1/topic_collect/', // 获取收藏主题，参数为/:loginname
  collect: 'https://cnodejs.org/api/v1/topic_collect/collect', // 收藏主题
  deCollect: 'https://cnodejs.org/api/v1/topic_collect/de_collect', // 删除收藏主题
  issue: 'https://cnodejs.org/api/v1/topics/', // 发布主题

  // 消息
  getMessages: 'https://cnodejs.org/api/v1/messages?accesstoken=', // 获取消息列表

  // 登录
  login: 'https://cnodejs.org/api/v1/accesstoken', // 发送token

  // 我的
  getUserInfo: 'https://cnodejs.org/api/v1/user/', // 获取用户信息，积分等数据
}
