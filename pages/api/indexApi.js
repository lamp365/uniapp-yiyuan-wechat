import request from "@/pages/utils/request.js"
export function getTopBanner() {
	return request({
		url: 'topBanner',
		method: 'GET'
	})
}
export function getSysInfo() {
  return request({
    url: 'sysInfo',
    method: 'GET'
  })
}
export function getOauthUrl() {
  return request({
    url: 'Login/oauth',
    method: 'GET'
  })
}