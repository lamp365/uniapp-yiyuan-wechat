<template>
	<view class="container">
		<myselfindex></myselfindex>
	</view>



</template>
<script>
  import {getOauthUrl} from "../api/indexApi.js";
  import {weixinLogin,verifykWeixnLogin,getH5Login} from "../utils/login.js";
	import myselfindex from './myselfindex'
	export default {
		data() {
			return {
				title: '',
				wx_ouathUrl:'',
				code:''
			}
		},
		components: {
			myselfindex
		},
		onLoad(option) {
			if(option !='' && Object.keys(option).length>0){
				const recommend_id = this.getUrlParam('recommend_id');
				if(recommend_id != '' && recommend_id!= null && recommend_id!==undefined){
					uni.setStorageSync('recommend_id',recommend_id)
				}
				
				
				const code = this.getUrlParam('code');
				// 判断是否存在code
				if(code != null && code != '' && code != undefined) {
					// 发送code
					getH5Login({code:code});
				} else {
					this.code = '';
				}
			}
					
			// #ifdef MP-WEIXIN
			weixinLogin();
			//#endif
				
			// #ifdef H5
			var that = this;
			setTimeout(function(){
				//获取授权url去跳转授权
				that.getH5LoginFunc();
			},200)
			//#endif
			
		},
		onShow() {
		    console.log('showw');
		},
		methods: {
			// 解析URL 参数
			getUrlParam(name) {
				let reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)')
				let r = window.location.search.substr(1).match(reg)
				if(r!=null){
					return unescape(r[2])
				} 
				return null
			},
			getH5LoginFunc() {
				if(this.code != ''){
					return '';
				}
			
				var has_h5_auth_key = uni.getStorageSync('has_h5_auth_key');
				if(has_h5_auth_key =='' || has_h5_auth_key == undefined){
					getOauthUrl().then(result=>{
						if(Object.keys(result).length>0){
							this.wx_ouathUrl = result.oauthUrl;
							window.location.href = this.wx_ouathUrl;
						}
					})
				}else{
					//如果有值，超出了半小时 还没授权 就可以重新让授权
					const oldTime = has_h5_auth_key;
					const currentTime = Date.now();
					const overTime = (currentTime - oldTime)/1000;
					var openid = uni.getStorageSync('openid');
					if(overTime > 1800){
						uni.removeStorageSync('has_h5_auth_key');
						getOauthUrl().then(result=>{
							if(Object.keys(result).length>0){
								this.wx_ouathUrl = result.oauthUrl;
								window.location.href = this.wx_ouathUrl;
							}
						})
					}
				}
				
			},
			onClick(e) {
				uni.showToast({
					title: '列表被点击'
				})
			},
		}
	}
</script>

<style lang="scss">
	
</style>
