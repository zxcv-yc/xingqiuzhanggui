
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Index } from '../index-model.js';
var index = new Index(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    total:0,
    list:[],
    month:0,
    week:0,
    day:0,
    start:'',
    end:'',
    date: '2019-10-01',
    pageNum:1
  },

  onLoad: function (options) {
   
    
  },

  onShow:function(){
    this.setData({
        start: this.getNowFormatDate(),
        end: this.getNowFormatDate(),
    });
    this._loadData();
  },

  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  /* 加载所有数据 */
  _loadData: function () {
   this.getMoneyList();
   this.getMoney();
  },
  
  getMoney(){
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let param = {shop_id:shop_id};
    index.getMoney(param,(res) => {
      console.log(res)
        that.setData({
          day:res.data.day,
          week:res.data.week,
          month:res.data.month,
          total:res.data.total,
        });
     
    });
  },
  
  getMoneyList() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let start = this.data.start;
    let end = this.data.end;
    let pageNum = this.data.pageNum;
    let list = this.data.list;
    let param = {shop_id:shop_id,start,start,end:end,pageNum:pageNum};
    index.getMoneyList(param,(res) => {
        that.setData({
          list: list.concat(res.data),
        });
     
    });
  },

  bindStartChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      list:[],
      start: e.detail.value,
      pageNum:1
    });
    this.getMoneyList();
        
  },
  bindEndChange(e) {
    
    this.setData({
      list:[],
      end: e.detail.value,
      pageNum:1
    });
    this.getMoneyList();   
  },

  /* 上拉加载*/
  onReachBottom: function () {
    let pageNum = ++this.data.pageNum
    this.setData({
      pageNum: pageNum
    })
    this.getMoneyList();
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