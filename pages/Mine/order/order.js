
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Mine } from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    status:0,
    list:[],
    pageNum:1
  },

  onLoad: function (options) {
    if(options.status){
      this.setData({
        status: options.status,
      });
    }
    this._loadData();
  },

  onShow:function(){
    
  },

  /* 加载所有数据 */
  _loadData: function () {
   this.getOrderList();
  },
  
  
  
  getOrderList() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let status = this.data.status;
    let pageNum = this.data.pageNum;
    let list = this.data.list;
    let param = {shop_id:shop_id,status,status,pageNum:pageNum};
    mine.getOrderList(param,(res) => {
        that.setData({
          list: list.concat(res.data),
        });
     
    });
  },

  changStatus(e){
    let status = Function.getDataSet(e,'status');
    this.setData({
      status: status,
      pageNum:1,
      list:[]
    });
    this.getOrderList();
  },

  /* 上拉加载*/
  onReachBottom: function () {
    let pageNum = ++this.data.pageNum
    this.setData({
      pageNum: pageNum
    })
    this.getOrderList();
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2000)
  },


  /* 下拉刷新*/
  onPullDownRefresh: function () {
    this.setData({
      pageNum: 1
    })
    this._loadData();
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2000)
  }


  
})