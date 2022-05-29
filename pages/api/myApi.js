import request from "@/pages/utils/request.js"
export function collectProduct(params) {
	return request({
		url: 'collect',
		method: 'GET',
		data: params
	})
}