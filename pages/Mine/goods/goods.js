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
    goods_id: 0,
    goodsInfo: null,
    money: 0,
    

  },

  onLoad: function(options) {
    let isPhone = app.globalData.isIphoneX;
    if (isPhone) {
      this.setData({
        btuBottom: "68rpx",
      })
    }
    this.setData({
      goods_id: options.goods_id
    });

    this._loadData();
  },

  onShow: function() {

  },

  /* 加载所有数据 */
  _loadData: function() {

    this.getGoodsDetail();

  },

  getGoodsDetail() {
    var that = this;
    var param = {
      goods_id: this.data.goods_id
    };
    mine.goodsDetail(param, (res) => {
      that.setData({
        goodsInfo: res.data.goods,
      });
    });
  },

  // 跳转页面
  buyGoods() {
    Function.linkTo('/pages/Index/comfirm/comfirm?goods_id=' + this.data.goods_id);
  },

  goIndex() {
    Function.linkTo('/pages/Index/index/index');
  },

  goMine() {
    Function.linkTo('/pages/Mine/index/index');
  },


  // 跳转页面
  buyCard(e) {
    let type = Function.getDataSet(e, 'type');
    Function.linkTo('/pages/Mine/buycard/buycard?type=' + type);
  }


})