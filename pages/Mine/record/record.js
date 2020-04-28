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
    // list:[],
    list: 213213,
    pageNum: 1,
    balance: 0,
    overmoney: 0,
    amount: 0,
    money: 0,
    isAll: false,
    listData: [],
    batchIds: '', //选中的ids
  },

  onLoad: function(options) {
    this._loadData();

  },

  onShow: function() {


  },

  /* 加载所有数据 */
  _loadData: function() {

    this.getRecord();
    this.getWithdrawOrder()
  },

  getRecord: function() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let pageNum = this.data.pageNum;
    // let list = this.data.list;
    // let list = 212133;
    let param = {
      shop_id: shop_id,
      pageNum: pageNum
    };
    mine.getRecord(param, (res) => {
      console.log(res)
      that.setData({
        // list: list.concat(res.data.data),
        is_withdraw: res.data.is_withdraw,
        // withdraw_id: res.data.withdraw_id,
        balance: res.data.balance,
        overmoney: res.data.overmoney,
        money: res.data.money,
      });
      if (res.data.is_withdraw) {
        this.setData({
          withdraw_id: res.data.withdraw_id
        })
      }
    });
  },

  //获取提现订单
  getWithdrawOrder: function() {
    let _this = this
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let listData = _this.data.listData
    let pageNum = this.data.pageNum;
    let param = {
      shop_id: shop_id,
      // shop_id: 170,
      pageNum: pageNum
    };
    mine.getWithdrawOrder(param, res => {

      let _data = res.data
      for (let i in _data) { //字符串转浮点，计算实收价格
        _data[i].cost_price = parseFloat(_data[i].cost_price)
        _data[i].coupon_amount = parseFloat(_data[i].coupon_amount)
        _data[i].paidup_price = _this.accSub(_this.accMul(_data[i].cost_price, _data[i].num), _data[i].coupon_amount)
      }
      console.log(_data)
      _this.setData({
        listData: listData.concat(_data)
      });
    })
  },
  /* 上拉加载*/
  onReachBottom: function() {
    let pageNum = ++this.data.pageNum
    this.getWithdrawOrder();
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 2000)
  },

  //
  __parseFloat: function(e) {
    return parseFloat(e)
  },
  /* 下拉刷新*/
  onPullDownRefresh: function() {
    this.setData({
      pageNum: 1
    })
    this._loadData();
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 2000)
  },
  goWithdrawalsRecord() {
    Function.linkTo('/pages/Mine/withdrawalsRecord/withdrawalsRecord');
  },
  gowithdrawalInfo(e) {
    // let id = Function.getDataSet(e,'id')
    Function.linkTo('/pages/Mine/withdrawalsRecord/withdrawalsRecord');
    // Function.linkTo('/pages/Mine/withdrawInfo/withdrawInfo?id='+id);
    // console.log(wid)
  },
  goWithdrawalsRules(e) {
    Function.linkTo('/pages/Mine/withdrawalRules/withdrawalRules');
  },

  //单点复选框
  checkboxChange: function(e) {
    let values = e.detail.value
    if (e.detail.value.length === this.data.listData.length) {
      this.setData({
        isAll: 1
      })
    } else {
      this.setData({
        isAll: 0
      })
    }
    let priceArr = this.getPriceArr(values, this.data.listData)
    let _amount = this.addFloat(priceArr)
    this.setData({
      batchIds: e.detail.value, //单个选中的值
      amount: _amount
    })

  },

  //点击全选
  allChecked: function(e) {
    console.log(e)
    var that = this;
    var arr = []; //存放选中id的数组
    for (let i = 0; i < that.data.listData.length; i++) {
      that.data.listData[i].checked = (!that.data.isAll)
      if (that.data.listData[i].checked == true) {
        // 全选获取选中的值
        // console.log(that.data.listData[i])
        arr.push(that.data.listData[i].id);
      }
    }
    if (arr.length) {
      let priceArr = this.getPriceArr(arr, this.data.listData)
      let _amount = this.addFloat(priceArr)
      that.setData({
        amount: _amount
      })
    } else {
      that.setData({
        amount: 0
      })
    }
    that.setData({
      listData: that.data.listData,
      isAll: (!that.data.isAll),
      batchIds: arr
    })

  },
  //点击提现按钮
  goStartWithdraw: function() {
    let _this = this
    if (!_this.data.amount || !this.data.batchIds) {
      Function.layer('请选择您要提现的订单')
    } else {
      if (parseFloat(_this.data.amount) < 1) {
        Function.layer('提现金额最低为1元')
      } else {
        Function.linkTo('/pages/Mine/startWithdraw/startWithdraw?amount=' + _this.data.amount + '&order_ids=' + _this.data
          .batchIds);
      }

    }

  },

  //获取选中的商品价格数组
  getPriceArr: function(idArr, dataArr) {
    let p = []
    for (let j in idArr) {
      for (let i in dataArr) {
        if (dataArr[i].id == idArr[j]) {
          p.push(dataArr[i].paidup_price)
        }
      }
    }
    return p
  },
  //浮点数相加精度处理
  addFloat: function(val) {
    let max = 0
    let count = 0
    for (let i = 0; i < val.length; i++) {
      const strVal = val[i].toString()
      const index = strVal.indexOf('.')
      let num = 0
      if (index > -1) {
        num = strVal.length - 1 - index
        max = num > max ? num : max
      }
    }
    for (let i = 0; i < val.length; i++) {
      count += Math.round(val[i] * Math.pow(10, max))
    }
    return count / Math.pow(10, max)
  },
  //浮点数乘法精度处理
  accMul: function(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) {}
    try {
      m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  //浮点数减法精度处理
  accSub: function(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka 
    //动态控制精度长度 
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
})