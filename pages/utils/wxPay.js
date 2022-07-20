/**
    微信(公众号)支付方法
	npm init 
	npm install weixin-js-sdk -S
**/
import wx from 'weixin-js-sdk'
//const wx = require('jweixin-module');
const wexinPay = (data, callback, errorCallback) => {
	let [appId, timestamp, nonceStr, signature, packages, sign] = [data.appId, data.timeStamp, data.nonceStr, data.signature,
		data.package, data.paySign
	];
	
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId, // 必填，公众号的唯一标识
		timestamp, // 必填，生成签名的时间戳
		nonceStr, // 必填，生成签名的随机串
		signature, // 必填，签名，见附录1
		jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest', {
			appId: appId, //公众号名称，由商户传入
			timeStamp: timestamp, //时间戳，自1970年以来的秒数
			nonceStr: nonceStr, //随机串
			package: data.package,
			signType: 'MD5', //微信签名方式：
			paySign: sign //微信签名
		},
		function(res) {
			if (res.err_msg == 'get_brand_wcpay_request:ok') {
				// 使用以上方式判断前端返回,微信团队郑重提示：
				//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				//支付成功回调
				callback(res)
			} else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
				//支付失败回调
				errorCallback(res)
			}
		}
	)
}

export default {
	wexinPay
}