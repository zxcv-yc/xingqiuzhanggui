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
    listData: [],
    url: Config.Url,
    pageNum: 1,
    batchIds: '', //选中的ids
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      formData: options.formData
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pageNum = ++this.data.pageNum
    this.getGoods();
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
    this.getGoods()
  },
  /**
   * 获取商户下的商品
   */
  getGoods: function() {
    let _this = this
    let listData = _this.data.listData
    let prarm = {
      shop_id: wx.getStorageSync('members').shop_id,
      pageNum: _this.data.pageNum
    }
    mine.getGoods(prarm, res => {
      console.log(res)
      _this.setData({
        listData: listData.concat(res.data)
      })
    })
  },
  addCoupon: function() {
    let param = JSON.parse(this.data.formData)
    param.shop_id = wx.getStorageSync('members').shop_id
    param.goods_id = this.data.batchIds.toString()
    mine.addCoupon(param, res => {
      if (res.code == 200) {
        Function.layer(res.msg)
        setTimeout(function() {
          wx.setStorageSync('couponRefresh', 1)
          wx.navigateBack({
            delta: 2,
          })
        }, 1500)
      }
      console.log(res)
    })
  },
  //全选与反全选
  allChecked: function(e) {
    console.log(e)
    var that = this;
    var arr = []; //存放选中id的数组
    for (let i = 0; i < that.data.listData.length; i++) {

      that.data.listData[i].checked = (!that.data.isAll)

      if (that.data.listData[i].checked == true) {
        // 全选获取选中的值
        arr.push(that.data.listData[i].id.toString());
      }
    }
    console.log(arr)
    that.setData({
      listData: that.data.listData,
      isAll: (!that.data.isAll),
      batchIds: arr
    })
  },

  // 单选
  checkboxChange: function(e) {
    let _this = this
    console.log(e.detail.value)
    if (e.detail.value.length === _this.data.listData.length) {
      this.setData({
        isAll: 1
      })
    } else {
      this.setData({
        isAll: 0
      })
    }
    this.setData({
      batchIds: e.detail.value //单个选中的值
    })
  },
})