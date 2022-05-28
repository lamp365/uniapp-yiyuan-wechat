import request from "@/pages/utils/request.js"
export function getUserOneCoupon(params) {
	return request({
		url: 'oneCoupon',
		method: 'POST',
		data: params
	})
}
export function getAllCoupon() {
	return request({
		url: 'getAllCoupon',
		method: 'GET'
	})
}