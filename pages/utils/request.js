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
			// console.log(res[1].data);
			if(res[1].data.code == 200){
				resolved(res[1].data.data);
			}else{
				var data = res[1].data;
				if(res[1].data.hasOwnProperty('data')){
					if(data.data.hasOwnProperty('noShowMsg')){
						//失败不需要弹出的
						rejected(res[1].data);
						return '';
					}
				}
				uni.showToast({
					title: res[1].data.msg,
					duration: 2000,
					icon: 'error'
				})
				rejected(res[1].data);
			}
		}).catch(error => {
			console.log('进入错误分支啦');
			rejected(error[1]);
		});

    });
}
export default service;