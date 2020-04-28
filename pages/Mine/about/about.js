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
    url: Config.Url,
    info: '',
  },

  onLoad: function(options) {

    this._loadData();
  },

  onShow: function() {

  },

  /* 加载所有数据 */
  _loadData: function() {
    // this.getContent();
    this.plateformInfo();
  },

  plateformInfo() {
    let param = {}
    mine.plateformInfo(param, (res) => {
      console.log(res)
      this.setData({
        info: res.data
      })
    });
  },

  getContent() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let param = {
      shop_id: shop_id
    };
    let aa = {
      "content": '<div class="qwer" style="color: red;"> 测试文本</div>'
    }
    mine.getContent(param, (res) => {
      that.setData({
        // info: res.data,
        info: aa,
      });

    });
  },


  /* 下拉刷新*/
  onPullDownRefresh: function() {

    this._loadData();
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 2000)
  }



})