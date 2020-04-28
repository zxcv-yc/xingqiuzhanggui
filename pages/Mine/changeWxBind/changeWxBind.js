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
    second: 60,
    reSend: true,
    code: null,
    userInfo: null,
    phoneNum: 15005380600
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      isWxAuthorize: options.isWxAuthorize,
      showPhoneNum: this.phoneNumberHide(this.data.phoneNum)
    })
    wx.setNavigationBarTitle({
      title: options.isWxAuthorize ? '更换绑定' : '绑定'
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
  //获取用户信息
  getUserInfo: function(e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      this.setData({
        userInfo: JSON.parse(e.detail.rawData)
      })
    }
    console.log(e)
  },
  //绑定微信
  wxBind: function() {
    let _this = this
    if (_this.data.code == null || _this.data.code.length < 4) {
      Function.layer('请输入验证码')
      return false
    }
    if (_this.data.userInfo === null) {
      Function.layer('请先点击获取头像昵称')
      return false
    }
    wx.showModal({
      title: '提示',
      content: '将绑定' + _this.data.userInfo.nickName + '为零钱提现微信，是否绑定？',
      success(res) {
        if (res.confirm) {
          wx.login({
            success(res1) {
              if (res1.code) {
                //发起网络请求
                let members = wx.getStorageSync('members');
                let shop_id = members.shop_id;
              
                let param = {
                  shop_id: shop_id,
                  code: res1.code,
                  // avatar:

                };
                console.log(param)
                return
                mine.bindWx(param, res2 => {
                  Function.layer(res2.msg)
                  setTimeout(function() {
                    _this._loadData();
                  }, 1500)
                })
              } else {
                console.log('登录失败！' + res1.errMsg)
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //换绑
  replaceWxBind: function() {
    let _this = this
    if (_this.data.code == null || _this.data.code.length < 4) {
      Function.layer('请输入验证码')
      return false
    }
    if (_this.data.userInfo === null) {
      Function.layer('请先点击获取头像昵称')
      return false
    }
    wx.showModal({
      title: '提示',
      content: '将绑定' + _this.data.userInfo.nickName + '为零钱提现微信，是否绑定？',
      success(res) {
        if (res.confirm) {
          wx.login({
            success(res1) {
              if (res1.code) {
                //发起网络请求
                let members = wx.getStorageSync('members');
                let shop_id = members.shop_id;
                let param = {
                  shop_id: shop_id,
                  code: res1.code,
                  codeMsg:_this.data.code,
                  tel:_this.data.phoneNum
                };
                console.log(param)
                return
                mine.bindWx(param, res2 => {
                  Function.layer(res2.msg)
                  setTimeout(function() {
                    _this._loadData();
                  }, 1500)
                })
              } else {
                console.log('登录失败！' + res1.errMsg)
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  //已经绑定的情况
  wxBinded: function() {
    wx.showModal({
      title: '提示',
      content: '您已经绑定了提现微信，如需修改请联系客服',
      showCancel: false,
    })
  },

  //处理手机号中间四位隐藏
  phoneNumberHide: function(d) {
    let mobile = "" + d;
    let reg = /(\d{3})\d{4}(\d{4})/;
    let mobile__ = mobile.replace(reg, "$1****$2")
    return mobile__
  },
  //发送验证码
  getCodeMsg: function() {
    let _this = this
    let param = {
      tel: _this.data.phoneNum
    }
    mine.sendsms(param, (res) => {
      if (res.code == 200) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
        _this.countdown()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
      }
    });
  },
  //验证码倒计时
  countdown: function() {
    var nsecond = 60;
    var that = this;
    var appCount = setInterval(function() {
      nsecond -= 1;
      that.setData({
        second: nsecond + 's',
        reSend: false
      })
      if (nsecond < 1) {
        clearInterval(appCount);
        //取消指定的setInterval函数将要执行的代码
        that.setData({
          second: 60,
          reSend: true
        })
      }
    }, 1000);
  },
  bindCodeInput: function(e) {
    this.setData({
      code: e.detail.value,
    });
  }
})