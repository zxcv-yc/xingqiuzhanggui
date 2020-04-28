// pages/Mine/couponManagement/couponManagement.js
import {
  Config
} from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import {
  Mine
} from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    couponList: []
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
    if (wx.getStorageInfoSync('couponRefresh')) {
      console.log('refresh')
      this.setData({
        pageNum: 1,
        couponList: []
      })
      this._loadData()
      wx.setStorageSync('couponRefresh', 0)
    }
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
    let pageNum = ++this.data.pageNum
    this.getCouponList();
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 加载所有数据
   */
  _loadData: function() {
    this.getCouponList()
  },

  /**
   * 获取优惠劵列表
   */
  getCouponList: function() {
    let _this = this
    let couponList = _this.data.couponList
    let param = {
      shop_id: wx.getStorageSync('members').shop_id,
      pageNum: _this.data.pageNum
    }
    mine.getCouponList(param, res => {
      console.log(res)
      _this.setData({
        couponList: couponList.concat(res.data)
      })
    })
  },
  /**
   * 删除优惠劵
   */
  deleteCoupon: function(e) {
    let _this = this
    let id = Function.getDataSet(e, 'id')
    let param = {
      shop_id: wx.getStorageSync('members').shop_id,
      id: id
    }
    mine.deleteCoupon(param, res => {
      Function.layer(res.msg)
      setTimeout(function() {
        let param = {
          shop_id: wx.getStorageSync('members').shop_id,
          pageNum: 1
        }
        mine.getCouponList(param, res => {
          console.log(res)
          _this.setData({
            couponList: res.data
          })
        })
      }, 1500)

    })
    console.log('点击删除')
  },
  /**
   * 添加优惠卷
   */
  goAddCoupon: function() {
    Function.linkTo('/pages/Mine/addCoupon/addCoupon')
  },
  /**
   * 查看优惠劵规则
   */
  goCouponRule: function() {
    Function.layer('查看优惠劵规则')
  },
})