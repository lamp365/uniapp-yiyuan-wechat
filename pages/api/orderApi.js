import request from "@/pages/utils/request.js"
export function getOrderInfoById(params) {
	return request({
		url: 'getOrderById',
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
export function deleteOrder(params) {
	return request({
		url: 'Order/delOrder',
		method: 'GET',
		data: params
	})
}
export function oneMorePay(params) {
	return request({
		url: 'Order/secondPay',
		method: 'POST',
		data: params
	})
}
export function getApplyedOrder(params) {
	return request({
		url: 'getApplyedOrder',
		method: 'GET',
		data: params
	})
}
export function applyedAfter(params) {
	return request({
		url: 'applyedAfter',
		method: 'POST',
		data: params
	})
}