import { Base } from '../../utils/base.js';
class Index extends Base {
  constructor() {
    super();
  }

  /* 登录 */
  login(param,callback) {
    var param = {
      url: 'Login/index',
      type: "post",
      data: param,
      loading:'hide',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /* 获取核销订单详情 */
  getOrderDetail(param,callback) {
    var param = {
      url: 'order/orderDetail',
      type: "post",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /* 获取用户待核销订单 */
  getWaitOrderList(param,callback) {
    var param = {
      url: 'store/getUserOrder',
      type: "post",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /* 核销用户订单 */
  confirm(param,callback) {
    var param = {
      url: 'store/hexiao',
      type: "post",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /* 获取店铺营业额 */
  getMoneyList(param,callback) {
    var param = {
      url: 'store/getMoneyList',
      type: "post",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /* 获取店铺营业额统计 */
  getMoney(param,callback) {
    var param = {
      url: 'store/getMoney',
      type: "post",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /* 判断登录者是否有效 */
  isLogin(param,callback) {
    var param = {
      url: 'login/isLogin',
      type: "post",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  // 消息推送
  sendMsg(param,callback) {
    var param = {
      url: 'Members/sendMsg',
      type: "post",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
    
  // 消息推送
  upPass(param,callback) {
    var param = {
      url: 'Login/upPass',
      type: "post",
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

};
export { Index };