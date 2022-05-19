import Config from "@/pages/utils/config.js"
export function weixinLogin(){
    uni.login({
        provider: 'weixin',
        success:function (res){
            uni.request({
                url: Config.restUrl + "getToken",
                method: "POST",
                data:{
                    code: res.code,
                    DeviceType: 'WEIXIN'
                },
                header:{
                    'content-type': 'application/x-www-form-urlencoded',
                    'token': uni.getStorageSync('token'),
                    'shopToken': Config.shopToken
                },
                success:function (ret){
                    if (ret.statusCode == 200 && ret.data.openid) {
                        var openid = ret.data.openid;
                        var userInfo = ret.data.userInfo;
                        var token = ret.data.token;
                        // 存入缓存
                        uni.setStorageSync(
                            'openid',openid
                        );
                        // 存入用户信息
                        uni.setStorageSync(
                            'userinfo',JSON.stringify(userInfo)
                        );
                        // 存入token
                        uni.setStorageSync(
                            'token',token
                        );
                    }
                }
            })
        }
    })
}
export function verifykWeixnLogin(){
	var that = this;
	uni.request({
		url: Config.restUrl + "verifyToken",
		method: "GET",
		header:{
		    'content-type': 'application/x-www-form-urlencoded',
		    'token': uni.getStorageSync('token'),
		    'shopToken': Config.shopToken
		},
		success:function(ret){
			// console.log(ret)
			if (ret.statusCode == 200 && ret.data.code == 200){
				return true;
			}else{
				weixinLogin();
			}
		}
	})
}
export function getH5Login(parame){
	var recommend_id = uni.getStorageSync('recommend_id');
	uni.request({
		url: Config.restUrl + "login/h5Token",
		method: "GET",
		data:{
		    code: parame.code,
				recommend_id:recommend_id
		},
		header:{
		    'content-type': 'application/x-www-form-urlencoded',
		    'token': uni.getStorageSync('token'),
		    'shopToken': Config.shopToken
		},
		success:function(ret){
			// console.log(ret)
			var time = Date.now();
			if (ret.statusCode == 200 && ret.data.openid){
				if(Object.keys(ret.data).length>0){
					uni.setStorageSync('has_h5_auth_key',time);
					var openid = ret.data.openid;
					var userInfo = ret.data.userInfo;
					var token = ret.data.token;
					// 存入缓存
					uni.setStorageSync(
						'openid',openid
					);
					// 存入用户信息
					uni.setStorageSync(
						'userinfo',JSON.stringify(userInfo)
					);
					// 存入token
					uni.setStorageSync(
						'token',token
					);
				}
				
			}
		}
	})
}
