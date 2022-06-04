import request from "@/pages/utils/request.js"
export function collectProduct(params) {
	return request({
		url: 'collect',
		method: 'GET',
		data: params
	})
}
export function orderState() {
	return request({
		url: 'user/state',
		method: 'GET'
	})
}
export function messageList() {
	return request({
		url: 'user/messageList',
		method: 'GET'
	})
}