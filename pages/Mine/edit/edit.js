
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Mine } from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    info:'',
    account:'',
    password:'',
    name:'',
    id:''
  },

  onLoad: function (options) {
    if(options.id){
      this.setData({
        id: options.id,
      });
      this.getManageInfo(options.id);
    }
    
  },

  onShow:function(){
    
  },

  getManageInfo(id) {
    var that = this;
    let param = {id:id};
    mine.getManageInfo(param,(res) => {
      let info = res.data
        that.setData({
          account: info.account,
          name:info.name
        });
     
    });
  },
  
  bindaccountInput(e){
    this.setData({
        account: e.detail.value,
      });
  },

  bindnameInput(e){
    this.setData({
        name: e.detail.value,
      });
  },
  bindpasswordInput(e){
    this.setData({
        password: e.detail.value,
      });
  },
  
  
  confirm() {
    var that = this;
    let account = this.data.account;
    let password = this.data.password;
    let name = this.data.name;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    if(!this.data.id && !password){
      Function.layer('请输入密码');
      return;
    }
    if(!name){
      Function.layer('请输入名字');
      return;
    }
    if(!account){
      Function.layer('请输入账号');
      return;
    }
    var param = {id:this.data.id,account:account,password:password,name:name,shop_id:shop_id};
    mine.updateManage(param,(res) => {
        if(res.code == 200){
          Function.layer('操作成功');
          Function.linkTo('/pages/Mine/manage/manage');
        }else{
          Function.layer(res.msg);
        }
        
    });
  }

  
})