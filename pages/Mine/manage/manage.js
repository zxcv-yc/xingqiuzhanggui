
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Mine } from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
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
  
   this.getManages();
  },
  
  getManages() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let pageNum = this.data.pageNum;
    let list = this.data.list;
    let param = {shop_id:shop_id,pageNum:pageNum};
    mine.getManages(param,(res) => {
        that.setData({
          list: list.concat(res.data),
          pageNum:pageNum+1
        });
     
    });
  },

  addManage(e){
    Function.linkTo('/pages/Mine/edit/edit');
  },

  editManage(e){
    let id = Function.getDataSet(e,'id');
    Function.linkTo('/pages/Mine/edit/edit?id='+id);
  },

  delManage(e){
    let id = Function.getDataSet(e,'id');
    let param = {id:id};
    mine.delManage(param,(res) => {
        Function.layer('删除成功');
        Function.linkTo('/pages/Mine/index/index');
    });
  },

 

  /* 上拉加载*/
  onReachBottom: function () {
    this.getManages();
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