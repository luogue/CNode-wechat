// const SERVER_URL = 'https://cnodejs.org/api/v1/'

// module.exports = SERVER_URL

const header = {
  'content-type': 'application/json' // 默认值
}

// 这样把请求结果的回调函数都拦截了的还是不需要的，仅仅需要一个全局拦截器用来拦截错误信息和设置默认配置的函数，自己封装一个

// get请求
function get(object) {
  wx.request({
    header,
    method: 'GET',
    fail (res) {
      console.log('请求错误===============================================')
      console.log(res)
    },
    ...object
  })
}

// post请求
function post(object) {
  wx.request({
    header,
    method: 'POST',
    fail (res) {
      console.log('请求错误===============================================')
      console.log(res)
    },
    ...object
  })
}

// 存储缓存数据
function setStorage (object) {
  wx.setStorage({
    success () {
      console.log('存储数据成功')
    },
    fail () {
      console.log('存储数据失败')
    },
    ...object
  })
}


// 删除缓存数据
function removeStorage (object) {
  wx.removeStorage({
    success() {
      console.log('删除数据成功')
    },
    fail() {
      console.log('删除数据失败')
    },
    ...object
  })
}

// 读取缓存数据
function getStorage (object) {
  wx.getStorage({
    success() {
      console.log('读取数据成功')
    },
    fail() {
      console.log('读取数据失败')
    },
    ...object
  })
}

// 同步读取缓存数据
function getStorageSync (key) {
  return wx.getStorageSync(key)
}

// 获取token
function getToken () {
  return getStorageSync('token')
}

// 倒计时
function countDown (page) {
  page.setData({
    expiration: true
  })
  setTimeout(() => {
    page.setData({ expiration: false })
  }, 3000)
}

function removeItem (arr, item) {
  let index = arr.indexOf(item)
  console.log(index)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

module.exports = {
  get,
  post,
  setStorage,
  getStorage,
  getStorageSync,
  removeStorage,
  countDown,
  getToken,
  removeItem
}