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
    info: '',
    isWxAuthorize: null,
    type:null
  },

  onLoad: function(options) {
    let members = wx.getStorageSync('members');
    this.setData({
      type: members.type
    })
  },

  onShow: function() {
    // this.isWxAuthorize()
    this._loadData();
  },

  /* 加载所有数据 */
  _loadData: function() {
    this.getContent();
    // this.checkBindWx()
  },

  goOrder(e) {
    let status = Function.getDataSet(e, 'status');
    Function.linkTo('/pages/Mine/order/order?status=' + status);
  },
  goMoney() {
    Function.linkTo('/pages/Mine/wallet/wallet');
  },
  goBusiness() {
    Function.linkTo('/pages/Index/business/business');
  },
  goAbout() {
    Function.linkTo('/pages/Mine/about/about');
  },
  goRecord() {
    Function.linkTo('/pages/Mine/record/record');
  },
  goCouponManagement() {
    Function.linkTo('/pages/Mine/couponManagement/couponManagement')
  },
  goDetail() {
    Function.linkTo('/pages/Mine/info/info');
  },

  goWithdraw() {
    Function.linkTo('/pages/Mine/bankinfo/bankinfo');
  },
  goManage() {
    Function.linkTo('/pages/Mine/manage/manage');
  },
  goWxAuthorize: function() {
    Function.linkTo('/pages/Mine/wxAuthorize/wxAuthorize');
  },
  goGoodList() {
    Function.linkTo('/pages/Mine/list/list');
  },

  goBindMobile() {
    Function.linkTo('/pages/Mine/bindMobile/bindMobile');
  },

  getContent() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let param = {
      shop_id: shop_id
    };
    mine.getContent(param, (res) => {
      that.setData({
        info: res.data,
      });

    });
  },



  /* 下拉刷新*/
  onPullDownRefresh: function() {

    this._loadData();
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 2000)
  },
  //绑定微信
  wxBind: function() {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '将绑定您当前微信为零钱提现微信，是否绑定？',
      success(res) {
        if (res.confirm) {
          wx.login({
            success(res1) {
              if (res1.code) {
                //发起网络请求
                let members = wx.getStorageSync('members');
                let shop_id = members.shop_id;
                let param = {
                  shop_id: shop_id,
                  code: res1.code
                };
                mine.bindWx(param, res2 => {
                  Function.layer(res2.msg)
                  setTimeout(function() {
                    _this._loadData();
                  }, 1500)
                })
              } else {
                console.log('登录失败！' + res1.errMsg)
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //已经绑定的情况
  wxBinded: function() {
    wx.showModal({
      title: '提示',
      content: '您已经绑定了提现微信，如需修改请联系客服',
      showCancel: false,
    })
  }



})