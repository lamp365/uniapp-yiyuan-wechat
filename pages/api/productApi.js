import request from "@/pages/utils/request.js"
export function getProduct(params) {
	return request({
		url: 'product/one',
		method: 'GET',
		data:params
	})
}