import Config from '@/pages/utils/config.js';
function service(options = {}) {
	var host_url = Config.restUrl;
	options.url = `${host_url}${options.url}`;

    return new Promise((resolved, rejected) => {
        uni.request({
			method:options.method,
			url: options.url,
			data: options.data,
			header:{
				'content-type': 'application/x-www-form-urlencoded',
				'token': uni.getStorageSync('token'),
				'shopToken': Config.shopToken 
			}
		}).then(res => {
			// console.log(res);
			if(res[1].data.code == 200){
				resolved(res[1].data.data);
			}else{
				 uni.showToast({
					title: res[1].data.message,
					duration: 2000,
					icon: 'error'
				})
			}
		}).catch(error => {
			rejected(error[1]);
		});

    });
}
export default service;