import {
	Base
} from '../../utils/base.js';
class Mine extends Base {
	constructor() {
		super();
	}

	// 获取店铺信息
	getContent(param, callback) {
		var param = {
			url: 'store/shopInfo',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 获取店铺订单
	getOrderList(param, callback) {
		var param = {
			url: 'store/getOrder',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 获取店铺待上架商品
	getGoodsList(param, callback) {
		var param = {
			url: 'store/waitGoods',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	// 获取店铺优惠劵列表
	getCouponList(param, callback) {
		var param = {
			url: 'store/getCouponList',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	// 获取商户商品
	getGoods(param, callback) {
		var param = {
			url: 'store/getGoods',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	// 提交新增优惠劵
  addCoupon(param, callback) {
		var param = {
      url: 'store/addCoupon',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	// 删除优惠劵
  deleteCoupon(param, callback) {
		var param = {
      url: 'store/deleteCoupon',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	// 审核商品
	handle(param, callback) {
		var param = {
			url: 'store/handle',
			type: "post",
			data: param,
			loading: 'hide',
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 获取商品详情
	goodsDetail(param, callback) {
		var param = {
			url: 'shop/getGoodsDetail',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 修改店铺信息
	updateShop(param, callback) {
		var param = {
			url: 'store/updateShop',
			type: "post",
			data: param,
			loading: 'hide',
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 提现
	withdraw(param, callback) {
		var param = {
			url: 'Members/updateBank',
			type: "post",
			data: param,
			loading: 'hide',
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	//开始提现
	shopWithdraw(param, callback) {
		var param = {
			url: 'Store/shopWithdraw',
			type: "post",
			data: param,
      loading: 'hide',
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	// 获取提现订单
	getWithdrawOrder(param, callback) {
		var param = {
			url: 'Store/getWithdrawOrder',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	// 获取提现信息
	getWithdrawInfo(param, callback) {
		var param = {
			url: 'Members/getShopWithdraw',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 获取提现记录
	getRecord(param, callback) {
		var param = {
			url: 'store/getRecord',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	// 获取可提现商品 YC
	getRecord(param, callback) {
		var param = {
			url: 'store/getRecord',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	// 获取店员
	getManages(param, callback) {
		var param = {
			url: 'store/getManages',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 获取店员信息
	getManageInfo(param, callback) {
		var param = {
			url: 'store/getManageInfo',
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 操作店员信息
	updateManage(param, callback) {
		var param = {
			url: 'store/updateManage',
			type: "post",
			data: param,
			loading: 'hide',
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 删除店员
	delManage(param, callback) {
		var param = {
			url: 'store/delManage',
			type: "post",
			data: param,
			loading: 'hide',
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
  // 获取平台说明
  plateformInfo(param, callback) {
    var param = {
      url: 'index/plateformInfo',
      type: "post",
      data: param,
      loading: 'hide',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  // 获取提现规则
  getWithdrawalRules(param, callback) {
    var param = {
      url: 'store/shopBankInfo',
      type: "post",
      data: param,
      loading: 'hide',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  // 查询是否微信绑定
  checkBindWx(param, callback) {
    var param = {
      url: 'Login/checkBindWx',
      type: "post",
      data: param,
      loading: 'hide',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  // 绑定微信
  bindWx(param, callback) {
    var param = {
      url: 'Login/bindWx',
      type: "post",
      data: param,
      loading: 'hide',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
	// 删除店员
	sendsms(param, callback) {
		var param = {
			url: 'Login/sendsms',
			type: "post",
			data: param,
			loading: 'hide',
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	// 删除店员
	bindTel(param, callback) {
		var param = {
			url: 'Login/bindTel',
			type: "post",
			data: param,
			loading: 'hide',
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
};
export {
	Mine
};
