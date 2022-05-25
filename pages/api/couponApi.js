import request from "@/pages/utils/request.js"
export function getUserOneCoupon(params) {
	return request({
		url: 'oneCoupon',
		method: 'POST',
		data: params
	})
}