import { Config } from 'config.js';
import { Base } from 'base.js';
class Access{

  getOpenid(callBack,id) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: Config.restUrl + 'wechat/getOtherOpenid',
          method: 'POST',
          data: {
            code: res.code,
            id:id
          },
          success: function (res) {
            if(res.data.code==200){
              callBack && callBack(res.data);
            }else{
              wx.showToast({
                title: "APPID或者APPSECRET不匹配",
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  }

  /*更新用户信息到服务器*/
  updateUserInfo(data,callback) {
    var that = this;
    that.getOpenid((res1) => {
      data.opend_id = res1.data.opend_id;
      data.id = res1.data.id;
      var param = {
        url: Config.restUrl + 'Members/updateUserInfo',
        method: 'POST',
        data: data,
        success: function (res) {
          callback && callback(res.data);
        }
      };
      wx.request(param);
    });
  }
}
export { Access };