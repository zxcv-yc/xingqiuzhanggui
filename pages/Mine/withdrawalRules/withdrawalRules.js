// pages/Mine/withdrawalRules/withdrawalRules.js
import {
  Config
} from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import {
  Mine
} from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rules: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getWithdrawalRules()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //获取提现规则
  getWithdrawalRules: function() {
    mine.getWithdrawalRules({}, res => {
      console.log(res)
      this.setData({
        rules:res.data
      })
    })
  }
})