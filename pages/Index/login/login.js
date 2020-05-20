import {
  Config
} from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import {
  Index
} from '../index-model.js';
var index = new Index(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    account: '',
    password: ''
  },

  onLoad: function(options) {


    this._loadData();
  },

  onShow: function() {

  },

  /* 加载所有数据 */
  _loadData: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindaccountInput(e) {
    this.setData({
      account: e.detail.value,
    });
  },
  bindpassInput(e) {
    this.setData({
      password: e.detail.value,
    });
  },

  login() {
    var that = this;
    let account = this.data.account;
    let password = this.data.password;
    console.log(password)
    if (!account || !password) {
      Function.layer('请填写账号或密码');
      return;
    }
    wx.login({
      success(resw) {
        console.log(resw)

        if (resw.code) {
          //发起网络请求
          var param = {
            account: account,
            password: password,
            code: resw.code
          };
          index.login(param, (res) => {
            if (res.code == 200) {
              // let member = res.data
              // member.maojie = 1
              // wx.setStorageSync('members', member);
              wx.setStorageSync('members', res.data);
              Function.linkTo('/pages/Index/index/index', true);
            } else {
              Function.layer(res.msg);
            }

          });
        } else {
          console.log('登录失败！' + resw.errMsg)
        }
      }
    })

  },


  /* 下拉刷新*/
  onPullDownRefresh: function() {

    this._loadData();
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 2000)
  },

  toxiugai() {
    wx.navigateTo({
      url: '../changepassword/changepassword',
    })
  }

})