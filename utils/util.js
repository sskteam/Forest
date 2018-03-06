
const config = require('../config.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 登录 获取用户信息
const userLogin = ()=> {
  wx.login({
    success : res=> {
      const rdata = {}; //用户信息以及授权信息
      // 获取用户信息
      wx.getUserInfo({
        success:info=> {
          console.log(info)
          rdata.rawData = info.rawData
          rdata.encryptedData = info.encryptedData
          rdata.iv = info.iv
          rdata.signature = info.signature
        }
      })
      // 把用户信息传给后台
      wx.request({
        url: config.rootUrl + '/user/wxlogin',
        data: rdata,
        success: res => {
          if (res.statusCode != 200) {
            wx.showToast({
              title: '服务器连接失败',
            })
          } else {
            // typeof func == 'function' && func(res.data)
          }
        } // request中的success回调结束
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  userLogin: userLogin                                  //登录
}
