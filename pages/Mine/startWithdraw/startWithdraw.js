// pages/Mine/startWithdraw/startWithdraw.js
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
    amount: '0', //提现金额
    wType: false, //提现方式
    order_ids: '', //订单id
    isBindBank: null, //是否绑定银行卡
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      amount: options.amount,
      order_ids: options.order_ids
    })

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
    this._loadData()
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
  /**
   * 加载所有数据
   */
  _loadData: function() {
    this.getWithdrawInfo()
  },
  goWithdrawalsRules(e) {
    Function.linkTo('/pages/Mine/withdrawalRules/withdrawalRules');
  },
  /**
   * 单选框状态改变
   */
  radioChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      wType: e.detail.value
    })
  },
  /**
   * 获取提现信息
   */
  getWithdrawInfo: function() {
    let _this = this
    let shop_id = wx.getStorageSync('members').shop_id;
    let param = {
      shop_id: shop_id
    }
    mine.getWithdrawInfo(param, res => {
      _this.setData({
        isBindBank: res.data
      })
      console.log(res)
    })
  },

  /**
   * 确定提现
   */
  startWidthDraw: function() {
    let _this = this;
    if (!this.data.wType) {
      Function.layer('请选择您的提现方式')
    } else {
      if (_this.data.wType == 2 && !_this.data.isBindBank) {
        wx.showModal({
          title: '提示',
          content: '你尚未绑定银行卡，点击确定前去绑定',
          success(res) {
            if (res.confirm) {
              Function.linkTo('/pages/Mine/bankinfo/bankinfo')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return
      }
      let param = {
        shop_id: wx.getStorageSync('members').shop_id,
        type: _this.data.wType,
        amount: _this.data.amount,
        order_ids: _this.data.order_ids
      }
      wx.showLoading({
        title: '处理中',
        mask: true,
      })
      mine.shopWithdraw(param, res => {
        console.log(res);
        if (res.code === 200) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1500,
            success: function() {
              setTimeout(function() {
                //要延时执行的代码
                wx.reLaunch({
                  url: '../record/record'
                })
              }, 2000) //延迟时间 
            }
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon:'none',
            duration:2000,
          })
        }
        // wx.hideLoading()
      })
    }
  }
})