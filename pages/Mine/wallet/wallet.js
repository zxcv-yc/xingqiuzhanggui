
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Mine } from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    balance:0,
    list:[],
    pageNum:1
  },

  onLoad: function (options) {
   
    
  },

  onShow:function(){
    this._loadData();
  },

  /* 加载所有数据 */
  _loadData: function () {
   this.getList();
   this.getBalance();
  },
  
  getBalance(){

  },
  
  getList() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let status = this.data.status;
    let pageNum = this.data.pageNum;
    let list = this.data.list;
    let param = {shop_id:shop_id,status,status,pageNum:pageNum};
    /*index.getOrderList(param,(res) => {
        that.setData({
          list: list.concat(res.data),
        });
     
    });*/
  },

  wallet() {
    
    Function.linkTo('/pages/Mine/withdraw/withdraw');
        
  },

  /* 上拉加载*/
  onReachBottom: function () {
    let pageNum = ++this.data.pageNum
    this.setData({
      pageNum: pageNum
    })
    this.getList();
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