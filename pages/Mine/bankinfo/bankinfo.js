
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Mine } from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    desc:'',
    bank_name:'',
    bank_no:'',
    real_name:'',
    id:''
  },

  onLoad: function (options) {
    
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
    let shop_id = member.shop_id;
    var param = {
      shop_id:shop_id,
    }
    mine.getWithdrawInfo(param, (res) => {
        that.setData({
          bank_name:res.data.bank_name || '',
          bank_no:res.data.bank_no || '',
          real_name:res.data.real_name || '',
          id:res.data.id || '',
        })
      
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
    var bank_name = this.data.bank_name;
    var bank_no = this.data.bank_no;
    var real_name = this.data.real_name;
    var id = this.data.id;
    if(!bank_no || !real_name || !bank_name){
      Function.layer('银行卡信息不能为空');return;
    }
    wx.showModal({
      title: '请确认填写的信息无误',
      success (res5) {
        if (res5.confirm) {
          let member = wx.getStorageSync('members');
          let shop_id = member.shop_id;
          var param = {id:id,bank_name:bank_name,real_name:real_name,bank_no:bank_no,shop_id:shop_id};
          mine.withdraw(param,(res) => {
              if(res.code == 200){
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
    
  }

  
})