
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Index } from '../index-model.js';
var index = new Index(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    order_id:'',
    info:null,
    goods:null
  },

  onLoad: function (options) {
    if(!options.order_id){
      Function.layer('参数错误,请重新核销...');
    }
    this.setData({
        order_id: options.order_id,
    });
    this._loadData();
  },

  onShow:function(){
    
  },

  /* 加载所有数据 */
  _loadData: function () {
    this.getOrderDetail();
  },

 
  getOrderDetail() {
    var that = this;
    let order_id = this.data.order_id;
    var param = {order_id:order_id};
    index.getOrderDetail(param,(res) => {
        
      that.setData({
          info: res.data,
          goods: res.data.goods,
      });
        
        
    });
  },

  goBack(){
    Function.linkTo('/pages/Index/index/index',true);
  },


  /* 下拉刷新*/
  onPullDownRefresh: function () {
    
    this._loadData();
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2000)
  }


  
})