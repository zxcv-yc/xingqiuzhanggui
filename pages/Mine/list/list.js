
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
    
    this._loadData();
  },

  onShow:function(){
    this.setData({
      list: [],
    });
    this.getGoodsList();
  },

  /* 加载所有数据 */
  _loadData: function () {
   
  },
  
  
  
  getGoodsList() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let pageNum = this.data.pageNum;
    let list = this.data.list;
    let param = {shop_id:shop_id,pageNum:pageNum};
    mine.getGoodsList(param,(res) => {
        that.setData({
          list: list.concat(res.data),
        });
     
    });
  },

  goGoods(e){
    let goods_id = Function.getDataSet(e, 'goods_id');
    Function.linkTo('/pages/Mine/goods/goods?goods_id='+goods_id);
  },

  getPass(e){
    var that = this;
    var goods_id = Function.getDataSet(e, 'goods_id');
    var status = Function.getDataSet(e, 'status');
    var index = Function.getDataSet(e, 'index');
    wx.showModal({
      title: '请确认操作无误',
      success (res5) {
        if (res5.confirm) {
          var param = {goods_id:goods_id,status:status};
          mine.handle(param,(res) => {
              if(res.code == 200){
                let goodslist = that.data.list;
                goodslist.splice(index, 1);
                that.setData({
                  list: goodslist,
                });
                Function.layer('操作成功');
              }else{
                Function.layer(res.msg);
              }
              
          });
        } else if (res5.cancel) {
          Function.layer('点击了取消');
        }
        
      }
    })
  },

  /* 上拉加载*/
  onReachBottom: function () {
    let pageNum = ++this.data.pageNum
    this.setData({
      pageNum: pageNum
    })
    this.getGoodsList();
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