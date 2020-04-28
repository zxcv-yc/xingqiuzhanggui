import {
  Config
} from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import {
  Index
} from '../index-model.js';
var index = new Index(); //实例化 首页 对象

import {
  Access
} from '../../../utils/access.js';
var access = new Access();

var app = getApp();

Page({
  data: {
    url: Config.Url,
    level: 1
  },

  onLoad: function(options) {
    let member = wx.getStorageSync('members');
    if (!member) {
      wx.redirectTo({
        url: '/pages/Index/login/login',
      })
      return;
    } else {
      this.setData({
        level: member.level,
      });
      if (member.level == 1) {
        wx.hideTabBar();
      }
    }
    this._loadData();
  },

  onShow: function() {
    this.isLogin();
  },

  onReady() {
    var mobile = wx.getStorageSync('members').mobile
    if (!mobile) {
      wx.navigateTo({
        url: '/pages/Mine/bindMobile/bindMobile',
      })
    }
  },

  /* 加载所有数据 */
  _loadData: function() {

  },
  isLogin() {
    var that = this;
    let member = wx.getStorageSync('members');
    var id = member.id;
    var param = {
      id: id
    };
    index.isLogin(param, (res) => {
      console.log(res)
      if (res.code == 200) {
        if (!res.data.opend_id) {
          // access.getOpenid((res) => {

          // }, id);
        }
      } else {
        Function.layer(res.msg);
        wx.redirectTo({
          url: '/pages/Index/login/login',
        })
        return;
      }

    });
  },
  goBusiness() {

    //Function.layer('功能开发中...');
    Function.linkTo('/pages/Index/business/business');

  },

  goSubuject() {
    wx.requestSubscribeMessage({
      tmplIds: ['9UVXb2aAXvYnxZ9FHu1SYSlLt73uXsAZ1yHSWbxNnFQ', 'zBm1gn2c9zHqpStdvuKLnL5fKYJEIQ2B6lv3BzSiG_s', 'RY0ZX_m_M46tWRJL1Z6zqP9vhJ0CURQxzOWP7ZV5KAU'],
      success(res) {},
      complete(res1) {
        console.log(res1)
      }
    })
  },
  goOrder() {

    Function.linkTo('/pages/Mine/order/order?status=2');

  },
  goScan() {

    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        if (res.errMsg == 'scanCode:ok') {
          Function.linkTo('/pages/Index/waitOrder/waitOrder?code=' + res.result);
        } else {
          Function.layer('扫码失败,请重新扫');
        }
      },
      fail() {
        Function.layer('扫码失败,请重新扫');
      }
    })

  },
  goInput() {

    Function.linkTo('/pages/Index/hexiao/hexiao');

  },


  /* 下拉刷新*/
  onPullDownRefresh: function() {

    this._loadData();
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //获取用户授权
  bindGetUserInfo:function(e){
    console.log(e)
  }


})