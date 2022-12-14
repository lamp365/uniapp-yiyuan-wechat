import request from "@/pages/utils/request.js"
export function getUserOneCoupon(params) {
	return request({
		url: 'oneCoupon',
		method: 'POST',
		data: params
	})
}
export function geOrderCoupon(params) {
	return request({
		url: 'orderCoupon',
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
export function lingQuan(params) {
	return request({
		url: 'lingQuan',
		method: 'GET',
		data: params
	})
}
export function getUserCoupon() {
	return request({
		url: 'userCoupon',
		method: 'GET'
	})
}