import request from "@/pages/utils/request.js"
export function getOrderInfoById(params) {
	return request({
		url: 'getOrderInfoById',
		method: 'GET',
		data: params
	})
}