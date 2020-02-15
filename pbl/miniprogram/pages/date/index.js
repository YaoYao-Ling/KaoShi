"use strict";
//获取应用实例
const app = getApp()

Page({
  data: {
    start: '',
    end: '',
    distance: 0,
    endDate:''
  },
  onLoad(options){
    // 在这里获取路由传参，赋给this
  },
  onReady(){
    // 不怎么使用
  },
  onShow(){
    // 统一在这里发起网络请求和一些初始化的工作
    let now = new Date();
    now = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDay()).padStart(2,'0')}`;

    this.setData({
        endDate: now,
        start: now,
        end: now
    })
  },
  changeStart(e){
    console.log('e...', e);
    
    this.setData({
      start : e.detail.value
    },()=>{
      this.getDistance()
    })
  },
  // pre 2020-02 now 2019-12
  changeEnd(e){
    this.setData({
      end: e.detail.value
    },()=>{
      this.getDistance()
    })
  },
  getDistance(){
    let distance =  +new Date(this.data.end) - (+new Date(this.data.start));
    console.log('distance....',distance)
    this.setData({
      // 计算天数 取整
      distance: Math.floor(distance/1000/60/60/24)
    })
  }
})