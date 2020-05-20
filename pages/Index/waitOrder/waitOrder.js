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
    list: [],
    code: 0
  },

  onLoad: function(options) {
    if (!options.code) {
      Function.layer('参数错误,请重新核销...');
    }
    this.setData({
      code: options.code,
    });
    this._loadData();
  },

  onShow: function() {

  },

  /* 加载所有数据 */
  _loadData: function() {
    this.getWaitOrderList();
  },


  getWaitOrderList() {
    var that = this;
    let code = this.data.code;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    var param = {
      code: code,
      shop_id: shop_id
    };
    index.getWaitOrderList(param, (res) => {
      if (res.code == 200) {
        that.setData({
          list: res.data,
        });
      } else {
        Function.layer(res.msg);
      }

    });
  },

  confirm(e) {
    let order_id = Function.getDataSet(e, 'order_id');
    var param = {
      order_id: order_id
    };
    index.confirm(param, (res) => {
      if (res.code == 200) {
        let members = wx.getStorageSync('members');
        let shop_id = members.shop_id;
        var param1 = {
          shop_id: shop_id,
          type: 3
        };
        index.sendMsg(param1, (res) => {
          console.log(res)
        });
        Function.linkTo('/pages/Index/finish/finish?order_id=' + order_id);
      } else {
        Function.layer(res.msg);
      }

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