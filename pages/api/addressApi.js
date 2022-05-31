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