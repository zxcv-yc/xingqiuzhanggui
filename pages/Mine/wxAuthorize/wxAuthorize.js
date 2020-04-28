
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
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.checkBindWx()
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //判断是否微信授权
  checkBindWx: function () {
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let param = {
      shop_id: shop_id
    };
    mine.checkBindWx(param, res => {
      if (res.data.opend_id) {
        let userinfo ={
          nickName:res.data.nickname,
          // avat
        }
        this.setData({
          isWxAuthorize: 1,

        })
      } else {
        this.setData({
          isWxAuthorize: false
        })
      }
      console.log(res)
    })
  },
  goChangeWxBind:function(){
    Function.linkTo('/pages/Mine/changeWxBind/changeWxBind?isWxAuthorize=' + this.data.isWxAuthorize);
  },
 
  goMy: function () {
    wx.navigateTo({
      url: '../my/my',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
