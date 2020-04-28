import {
  Index
} from '../index-model.js';
var index = new Index(); //实例化 首页 对象
import {
  Mine
} from '../../Mine/mine-model.js';
var mine = new Mine(); //实例化 首页 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 60,
    reSend: true,
    mobile: '',
    newPassWord: '',
    newPassWordTwo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  changemobile (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  changecode (e) {
    this.setData({
      code: e.detail.value
    })
  },

  changeNewPassWord (e) {
    this.setData({
      newPassWord: e.detail.value
    })
  },
  
  changeNewPassWordTwo (e) {
    this.setData({
      newPassWordTwo: e.detail.value
    })
  },

  verification () {
    var mobile = this.data.mobile
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号必须是11位',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var that = this,
      param = {
        tel: mobile
      }
    mine.sendsms(param, (res) => {
      if (res.code == 200) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
        that.countdown()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },

  countdown: function () {
    var nsecond = 60;
    var that = this;
    var appCount = setInterval(function () {
      nsecond -= 1;
      that.setData({
        second: nsecond + 's',
        reSend: false
      })
      if (nsecond < 1) {
        clearInterval(appCount);
        //取消指定的setInterval函数将要执行的代码
        that.setData({
          second: 60,
          reSend: true
        })
      }
    }, 1000);
  },

  submits () {
    var mobile = this.data.mobile,
    password = this.data.newPassWord,
    passwordTwo = this.data.newPassWordTwo,
    code = this.data.code
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号必须是11位',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (code.length != 4) {
      wx.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (password == '') {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    console.log(passwordTwo, password)
    if (passwordTwo != password) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var param = {
      tel: mobile,
      code: code,
      password: password
    }
    index.upPass(param, (res) => {
      console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: -1,
          })
        }, 1000);
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1000
        })
      }
    });
  }
})