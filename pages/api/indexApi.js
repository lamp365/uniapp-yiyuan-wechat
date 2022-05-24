import request from "@/pages/utils/request.js"
export function getTopBanner() {
	return request({
		url: 'topBanner',
		method: 'GET'
	})
}
export function getShopInfo() {
  return request({
    url: 'getShop',
    method: 'GET'
  })
}
export function getOauthUrl() {
  return request({
    url: 'Login/oauth',
    method: 'GET'
  })
}