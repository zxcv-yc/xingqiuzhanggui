import {
	Config
} from '../../../utils/config.js';
var Function = require("../../../utils/function.js");

import {
	Mine
} from '../mine-model.js';
var mine = new Mine(); //实例化 首页 对象
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		error: '',
		sdate: null, //领券开始时间
		edate: null, //领券结束时间
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
	/**
	 * 选择领劵开始时间
	 */
	bindSDateChange: function(e) {
		this.setData({
			sdate: e.detail.value
		})
	},
	/**
	 * 选择领劵开始时间
	 */
	bindEDateChange: function(e) {
		this.setData({
			edate: e.detail.value
		})
	},
	/**
	 * 下一步
	 */
	submitData: function(e) {
		let _this = this
		let values = e.detail.value
		values.is_show = values.is_show ? 1 : 0
		console.log(values)
		if (!_this.validation(values)) {
			Function.layer(_this.data.error)
			return false
		}
		Function.linkTo('/pages/Mine/suitableGoods/suitableGoods?formData=' + JSON.stringify(values))
	},
	/**
	 * 表单验证
	 */
	validation: function(v) {
		if (v.name === '' || v.name.length < 2) {
			this.data.error = '请填写优惠劵名称';
			return false;
		}
		// let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		// if (!reg.test(v.mobile)) {
		// 	error = '请填写正确的手机号';
		// 	return false;
		// }
		if (v.amount === '') {
			this.data.error = '请填写满减金额';
			return false;
		}
		if (v.get_endtime === '请选择' || v.get_endtime == null) {
			this.data.error = '请选择优惠劵领取截止时间';
			return false;
		}
		if (v.get_starttime === '请选择' || v.get_starttime == null) {
			this.data.error = '请选择优惠劵领取开始时间';
			return false;
		}
		if (parseFloat(v.man_amount) < parseFloat(v.amount)) {
			this.data.error = '优惠劵满减金额不可大于达标金额';
			return false;
		}
		if (v.get_endtime < v.get_starttime) {
			this.data.error = '优惠劵领取截止时间不可早于开始时间';
			return false;
		}
		if (v.man_amount === '') {
			this.data.error = '请填写达标金额';
			return false;
		}
		if (v.use_time === '') {
			this.data.error = '请填写到期时间(天)';
			return false;
		}

		return true;
	}
})
