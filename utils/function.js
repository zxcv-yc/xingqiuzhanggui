import { Config } from 'config.js';
// 跳转链接
function linkTo(url,type=false) {
  if (type =="redirectTo"){
    wx.redirectTo({
      url: url,
    })
  }else{
    wx.navigateTo({
      url: url,
      fail: function (rs) {
        wx.switchTab({
          url: url
        })
      }
    })
  }
}

// 弹出提示框
function layer(msg){
  wx.showToast({
    title: msg,
    icon: "none",
    duration: 1500
  })
}

/*获得元素上的绑定的值*/
function getDataSet(event, key) {
  return event.currentTarget.dataset[key];
}

function isLogin() {
  var admin = wx.getStorageSync("admin");
  if (!admin) {
    linkTo("/pages/Admin/login/login");
  }
}
// 获取服务端配置数据
function getConfig(fields, callback) {
  wx.request({
    url: Config.restUrl + 'Custom/getConfig',
    data: {
      fields: fields
    },
    method: "post",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
       callback && callback(res.data.data);
    }
  });
}

module.exports={
    linkTo: linkTo,
    layer: layer,
    getDataSet: getDataSet,
    isLogin: isLogin,
    getConfig: getConfig
};