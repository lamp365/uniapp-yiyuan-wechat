import request from "@/pages/utils/request.js"
export function getArticleList(parames) {
	return request({
		url: 'Article/lists',
		method: 'GET',
		data:parames
	})
}
export function getHelp(parames) {
  return request({
    url: 'Article/help',
    method: 'GET',
	data:parames
  })
}
export function getContent(parames) {
  return request({
    url: 'Article/content',
    method: 'GET',
	data:parames
  })
}
export function getArticleAnli(parames) {
  return request({
    url: 'Article/anli',
    method: 'GET',
	data:parames
  })
}
export function getVideoAnli(parames) {
  return request({
    url: 'Article/vanli',
    method: 'GET',
	data:parames
  })
}

