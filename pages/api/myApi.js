import request from "@/pages/utils/request.js"
export function collectProduct(params) {
	return request({
		url: 'collect',
		method: 'GET',
		data: params
	})
}
export function orderState(params) {
	return request({
		url: 'user/state',
		method: 'GET',
		data: params
	})
}
export function messageList() {
	return request({
		url: 'user/messageList',
		method: 'GET'
	})
}
export function getCollectList() {
	return request({
		url: 'collectList',
		method: 'GET'
	})
}
export function getXieyi(parame) {
	return request({
		url: 'xieyi',
		method: 'GET',
		data: parame
	})
}
export function getAbout(parame) {
	return request({
		url: 'getShop',
		method: 'GET',
		data: parame
	})
}
export function saveUserInfo(data) {
	return request({
		url: 'saveUserInfo',
		method: 'POST',
		data: data
	})
}