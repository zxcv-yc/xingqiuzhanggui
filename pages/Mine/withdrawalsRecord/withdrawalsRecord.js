// pages/Mine/withdrawalsRecord/withdrawalsRecord.js
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
    pageNum: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadData()
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
    this.setData({
      pageNum: 1
    })
    this._loadData();
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pageNum = ++this.data.pageNum
    this.getRecord();
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /* 加载所有数据 */
  _loadData: function() {

    this.getRecord();
  },
  //获取记录
  getRecord: function() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let pageNum = this.data.pageNum;
    let list = this.data.list;
    // let list = 212133;
    let param = {
      shop_id: shop_id,
      pageNum: pageNum
    };
    mine.getRecord(param, (res) => {
      console.log(res)
      that.setData({
        list: list.concat(res.data.data),
      });
    });
  },
})