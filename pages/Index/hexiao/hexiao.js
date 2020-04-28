
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Index } from '../index-model.js';
var index = new Index(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    code:'',
  },

  onLoad: function (options) {
    
    this._loadData();
  },

  onShow:function(){
    
  },

  /* 加载所有数据 */
  _loadData: function () {
   
  },
  
  bindCodeInput(e){
    this.setData({
        code: e.detail.value,
      });
  },
  
  hexiao() {
    var that = this;
    let code = this.data.code;
    if(!code){
      Function.layer('请输入核销码');return;
    }
    Function.linkTo('/pages/Index/waitOrder/waitOrder?code='+ code);
  },


  /* 下拉刷新*/
  onPullDownRefresh: function () {
    
    this._loadData();
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2000)
  }


  
})