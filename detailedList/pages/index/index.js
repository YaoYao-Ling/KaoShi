//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:['目标','习惯','手记'],
    content:[
        {
          title:"1",
          text:"看一场私人电影"
        },
        {
          title:"2",
          text:"玩一次保龄球"
        },
        {
          title:"3",
          text:"玩一次射箭"
        },
        {
          title:"4",
          text:"练出几首自己的经典曲目"
        },
        {
          title:"5",
          text:"好好"
        },
        {
          title:"6",
          text:"在大庭广众之下演讲一次"
        },
    ]
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
