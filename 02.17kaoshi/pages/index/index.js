Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:['目标','习惯','手记'],
    curIndex:0,
    list:[
      {
        num:1,
        cont:"看一场私人电影"
      },
      {
        num:2,
        cont:"玩一次保龄球"
      },
      {
        num:3,
        cont:"玩一次射箭"
      },
      {
        num:4,
        cont:"练出几首自己的经典曲目"
      },
      {
        num:5,
        cont:"好好"
      },
      {
        num:6,
        cont:"在大庭广众下演讲一次"
      }
    ]
  },
  
  //tab切换
  tab:function(e){
    var index = e.currentTarget.dataset['index'];
    this.setData({
      curIndex:index
    })
  },
 
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