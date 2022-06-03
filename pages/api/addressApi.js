import request from "@/pages/utils/request.js"
export function getAddress(params) {
	return request({
		url: 'getAddress',
		method: 'GET',
		data:params
	})
}
export function createAddress(params) {
	return request({
		url: 'createAddress',
		method: 'POST',
		data:params
	})
}
export function getAddressList() {
	return request({
		url: 'allAddress',
		method: 'GET'
	})
}
export function delAddress(params) {
	return request({
		url: 'delAddress',
		method: 'GET',
		data:params
	})
}
export function addressDefault(params) {
	return request({
		url: 'addressDefault',
		method: 'GET',
		data:params
	})
}