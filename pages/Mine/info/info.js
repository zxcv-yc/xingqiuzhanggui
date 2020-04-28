
import { Config } from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import { Mine } from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象

var app = getApp();

Page({
  data: {
    url: Config.Url,
    info:'',
    desc:'',
    content:'',
    business_work_time:'',
    address:'',
    mobile:'',
    region:[],
    pic:''
  },

  onLoad: function (options) {
    
    this._loadData();
  },

  onShow:function(){
    
  },

  /* 加载所有数据 */
  _loadData: function () {
   this.getContent();
  },

  getContent() {
    var that = this;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    let param = {shop_id:shop_id};
    let region = [];
    mine.getContent(param,(res) => {
      region.push(res.data.province)
      region.push(res.data.city)
      region.push(res.data.shop_area)
      let info = res.data
        that.setData({
          desc: info.desc,
          content: info.content,
          business_work_time: info.business_work_time,
          address: info.address,
          mobile: info.mobile,
          region:region,
          pic:info.pic,
          info:info
        });
     
    });
  },
  uploadDetailImage(e) { //这里是选取图片的方法
    var that = this;
    var pics = [];
    var detailPics = that.data.detailPics;
    
    wx.chooseImage({
      count: that.data.count, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        that.uploadimg({
          url: Config.restUrl, //这里是你图片上传的接口
          path: res.tempFilePaths[0], //这里是选取的图片的地址数组
        });
      },
    })

  },

  //多张图片上传
  uploadimg(data) {
    console.log(data)
    wx.showLoading({
      title: '上传中...',
      mask: true,
    })
    var that = this;
    wx.uploadFile({
      url: data.url+'store/uploadsimg',
      filePath: data.path,
      name: 'fileData',
      formData: null,
      success: (resp) => {
        wx.hideLoading();
        var str = resp.data //返回的结果，可能不同项目结果不一样
        var pic = JSON.parse(str);
        var pic_name = pic.data;
        that.setData({
          pic: pic_name
        })
      },
      fail: (res) => {
        Function.layer(res);
        
      }
    });
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  
  binddescInput(e){
    this.setData({
        desc: e.detail.value,
      });
  },
  bindcontentInput(e){
    this.setData({
        content: e.detail.value,
      });
  },
  bindtimeInput(e){
    this.setData({
        business_work_time: e.detail.value,
      });
  },
  bindaddressInput(e){
    this.setData({
        address: e.detail.value,
      });
  },
  bindmobileInput(e){
    this.setData({
        mobile: e.detail.value,
      });
  },
  
  login() {
    var that = this;
    let pic = this.data.pic;
    let desc = this.data.desc;
    let content = this.data.content;
    let business_work_time = this.data.business_work_time;
    let region = this.data.region;
    region = region.join(',')
    let address = this.data.address;
    let mobile = this.data.mobile;
    let members = wx.getStorageSync('members');
    let shop_id = members.shop_id;
    var param = {id:shop_id,pic:pic,desc:desc,content:content,business_work_time:business_work_time,region:region,address:address,mobile:mobile};
    mine.updateShop(param,(res) => {
        if(res.code == 200){
          Function.layer('修改成功');
        }else{
          Function.layer(res.msg);
        }
        
    });
  }

  
})