
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Mine } from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    desc:'',
    money:'',
    total:0,
    bank_name:'',
    bank_no:'',
    real_name:'',
    info:null
  },

  onLoad: function (options) {
    if(options.total){
      this.setData({
        total: options.total
      })
      
    }
    this._loadData();
  },

  onShow:function(){
    
  },

  /* 加载所有数据 */
  _loadData: function () {
   this.getContent();
   this.getInfo();  //获取提现信息
  },

  getContent() {
    var that = this;
    Function.getConfig("withdraw_tip",(res)=>{
      that.setData({
        desc: res.withdraw_tip
      })
    })
  },

  getInfo(){
    var that = this;
    let member = wx.getStorageSync('members');
    let user_id = member.shop_id;
    var param = {
      user_id:user_id,
      cate_type:2
    }
    mine.getWithdrawInfo(param, (res) => {
        that.setData({
          info: res.data,
          bank_name:res.data.bank_name,
          bank_no:res.data.bank_no,
          real_name:res.data.real_name,
        })
      
    })
  },
  
  bindMoneyInput(e) {

    this.setData({
      money: e.detail.value
    })
  },
  
  bindBankNameInput(e){
    this.setData({
        bank_name: e.detail.value,
      });
  },
  bindBankNoInput(e){
    this.setData({
        bank_no: e.detail.value,
      });
  },
  bindRealNameInput(e){
    this.setData({
        real_name: e.detail.value,
      });
  },
 
  
  withdraw() {
    var that = this;
    var total = this.data.total;
    var money = this.data.money;
    var bank_name = this.data.bank_name;
    if(money <= 0){
      Function.layer('输入的金额不对');return;
    }
    var bank_no = this.data.bank_no;
    var real_name = this.data.real_name;
    if(!bank_no || !real_name || !bank_name){
      Function.layer('提现信息不能为空');return;
    }
    wx.showModal({
      title: '请确认填写的信息无误',
      success (res5) {
        if (res5.confirm) {
          let member = wx.getStorageSync('members');
          let user_id = member.shop_id;
          let user_name = member.shop_name;
          var param = {amount:money,bank_name:bank_name,real_name:real_name,bank_no:bank_no,user_id:user_id,user_name:user_name,cate_type:2};
          mine.withdraw(param,(res) => {
              if(res.code == 200){
                Function.layer('提现申请成功');
              }else{
                Function.layer(res.msg);
              }
          });
        } else if (res5.cancel) {
          Function.layer('点击了取消');
        }
      }
    })
    
  }

  
})