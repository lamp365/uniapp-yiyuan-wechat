import request from "@/pages/utils/request.js"
export function getOrderInfoById(params) {
	return request({
		url: 'getOrderInfoById',
		method: 'GET',
		data: params
	})
}
export function createOrder(params) {
	return request({
		url: 'createOrder',
		method: 'POST',
		data: params
	})
}
export function getOrderList(params) {
	return request({
		url: 'Order/list',
		method: 'GET',
		data: params
	})
}
export function orderDetail(params) {
	return request({
		url: 'Order/detail',
		method: 'GET',
		data: params
	})
}