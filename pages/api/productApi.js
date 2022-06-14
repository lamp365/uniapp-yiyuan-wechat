import request from "@/pages/utils/request.js"
export function getProduct(params) {
	return request({
		url: 'product/one',
		method: 'GET',
		data:params
	})
}
export function getNewProduct(params) {
	return request({
		url: 'product/new',
		method: 'GET',
		data:params
	})
}
export function getRandProduct(params) {
	return request({
		url: 'product/rand',
		method: 'GET',
		data:params
	})
}
export function getSearchProduct(params) {
	return request({
		url: 'searchProduct',
		method: 'GET',
		data:params
	})
}
export function getTuijianProduct() {
	return request({
		url: 'product/tuijian',
		method: 'GET'
	})
}