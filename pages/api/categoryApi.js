import request from "@/pages/utils/request.js"
export function getCategoryType() {
	return request({
		url: 'category/all',
		method: 'GET'
	})
}
export function getProductsByCategory(params) {
  return request({
    url: 'product/by_category',
    method: 'POST',
		data:params
  })
}
