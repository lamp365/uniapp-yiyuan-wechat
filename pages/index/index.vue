<template>
	<view class="container">
		<view class="banner_box">
			<swiper :indicator-dots="true" :autoplay="true"   class="banner">
				<swiper-item>
				　　<image src="../../static/banner.png" mode="" class="banner"></image>
				</swiper-item>
				<swiper-item>
				　　<image src="../../static/banner.png" mode="" class="banner"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="notice_box">
			<view class="icon"><image src="../../static/notice.png" mode=""></image></view>
			<view class="gundong">
				<swiper :indicator-dots="false" :autoplay="true"   class="notice"  :interval="3000" :duration="1000" :vertical="true">
					<swiper-item>
					　　请充值用户，仔细阅读说明。
					</swiper-item>
					<swiper-item>
					　　请充值用户，仔细阅读说明，ok
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view style="height: 24rpx;background: #f8f8f8;"></view>
		
		<view class="nav_box">
			<view class="one">
				<view class="show_one">
					<image src="../../static/dianfei.png" mode=""></image>
					<view class="tit active">电费充值</view>
				</view>
			</view>
			<view class="one"></view>
			<view class="one"></view>
		</view>
		
		<!-- 充值账户 -->
		<view class="dianfei_box">
			<view class="">
				<view class="info"><image src="../../static/zhanghu.png"></image><text>充值账户</text></view>
				<view><input type="text" value="" v-model="account" placeholder="请输入缴费户号" placeholder-style="color:#B7B7B7;font-size:28rpx" class="input_box"/></view>
				
				<view class="info"><image src="../../static/address.png"></image><text>身份核对</text></view>
				<view><input type="text" value="" v-model="account" placeholder="请输入身份证后6位" placeholder-style="color:#B7B7B7;font-size:28rpx" class="input_box"/></view>
			
				<view class="info"><image src="../../static/types.png"></image><text>选择类型</text> </view>
				<view style="height: 10rpx;"></view>
				<view class="dianfei_tit">
					<view>国家电网<text class="tips">（72小时内到账，充值需大于欠费）</text></view>
					<view class="to_sel"><image src="../../static/circle@selected.png" mode=""></image></view>
				</view>
				<view class="dianfei_tit">
					<view>南方电网<text class="tips">（72小时内到账，如已欠费不可充值）</text></view>
					<view class="to_sel"><image src="../../static/circle@noselected.png" mode=""></image></view>
				</view>
			</view>
			<!-- info -->
		
			<view class="show_dian_info">
				<view class="one_dian">
					<view class="list_one">
						<view class="title">100元电费</view>
						<view class="tit1">国网电费</view>
						<view class="tit2">仅售190元</view>
					</view>
				</view>
				
				<view class="one_dian">
					<view class="list_one has_choose">
						<view class="title">200元电费</view>
						<view class="tit1">国网电费</view>
						<view class="tit2">仅售190元</view>
					</view>
				</view>
				
				<view class="one_dian">
					<view class="list_one">
						<view class="title">300元电费</view>
						<view class="tit1">国网电费</view>
						<view class="tit2">仅售190元</view>
					</view>
				</view>
				
				<view class="one_dian">
					<view class="list_one">
						<view class="title">500元电费</view>
						<view class="tit1">国网电费</view>
						<view class="tit2">仅售190元</view>
					</view>
				</view>
				
				<view class="one_dian">
					<view class="list_one">
						<view class="title">800元电费</view>
						<view class="tit1">国网电费</view>
						<view class="tit2">仅售190元</view>
					</view>
				</view>
				
				<view class="one_dian">
					<view class="list_one">
						<view class="title">1000元电费</view>
						<view class="tit1">国网电费</view>
						<view class="tit2">仅售190元</view>
					</view>
				</view>
				
				<view class="one_dian">
					<view class="list_one">
						<view class="title">1500元电费</view>
						<view class="tit1">国网电费</view>
						<view class="tit2">仅售190元</view>
					</view>
				</view>
				<view class="one_dian">
					<view class="list_one">
						<view class="title">2000元电费</view>
						<view class="tit1">国网电费</view>
						<view class="tit2">仅售190元</view>
					</view>
				</view>
				<view class="one_dian">
					<view class="list_one">
						<view class="title">3000元电费</view>
						<view class="tit1">国网电费</view>
						<view class="tit2">仅售190元</view>
					</view>
				</view>
			</view>
			
			<!-- 产品结束 -->
			<view class="remark1">南方电网：只支持广东、广西、海南、贵州、云南</view>
			<view class="remark1">国家电网：除以上5个区域全国其他地方都支持</view>
			<view class="sure_buy">立即充值</view>
		</view>
		
		<view style="height: 24rpx;background: #f8f8f8;"></view>
		<view class="chongzhi_remark">
			<view class="title"><image src="../../static/zhanghu.png"></image><text>充值说明</text></view>
			<view class="show_info">
				1、您好，欢迎关注xxx便民服务充值平台
			</view>
			<view class="show_info">
				2、因为确保充值成功，每一单都是人工审核，账户无误，以及欠费情况，在统一推单，故基本快的[几小时内到账][慢的需要24-72小时到账][能够接受再下单！急单务下]
			</view>
			<view class="show_info">
				3、充值后请耐心等待，假如失败，会原路退会。充值成功或失败，都会发送微信系统消息
			</view>
			<view class="show_info">
				4、如有问题随时咨询在线客服或电话：13304380438
			</view>
		</view>
		<view style="height: 60rpx;"></view>
	</view>



</template>
<script>
	import {getOauthUrl,getSysInfo,getTopBanner} from "../api/indexApi.js";
  import {weixinLogin,verifykWeixnLogin,getH5Login} from "../utils/login.js"
	export default {
		data() {
			return {
				title: '',
				topBanner: [],
				sysInfo:[],
				wx_ouathUrl:'',
				code:'',
				account: '',
			}
		},
		onLoad(option) {
			if(option !='' && Object.keys(option).length>0){
				const code = this.getUrlParam('code');
				// 判断是否存在code
				if(code == null || code == '') {
					this.code = code;
					window.location.href = this.wx_ouathUrl;
				} else {
					// 发送code           
					getH5Login({code:code})
				}
			}
						
			// #ifdef MP-WEIXIN
			weixinLogin();
			//#endif
			  
		 // #ifdef H5
			var that = this;
			setTimeout(function(){
				that.getH5LoginFunc();
			},200)
			//#endif
			
			getTopBanner().then(result=>{
				this.topBanner = result;
			});
			getSysInfo().then(result=>{
				this.sysInfo = result;
				uni.setNavigationBarTitle({
					title:result.name
				})
				uni.setStorageSync(
						'sysInfo',JSON.stringify(result)
				)
			});
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
	.banner{
		width:100%;
		height:320rpx;
		
	}
	.banner_box image{
		width:100%;
		height:320rpx;
	}
	.notice_box{
		padding: 12rpx 20rpx;
		display: flex;
		align-items: center;
	}
	.notice_box .icon image{
		height: 42rpx;
		width: 42rpx;
		margin-right: 22rpx;
	}
	.notice_box .gundong{
		flex: 1;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
	}
	.notice_box .notice{
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
	}
	// nav
	.nav_box{
		padding: 20rpx;
		display: flex;
		justify-content: space-around;
		border-bottom: 2rpx solid #f3f3f3;
	}
	.nav_box .one{width: 30%;}
	.nav_box .show_one{
		width: 135rpx;
		height: 120rpx;
	}
	.nav_box .show_one image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
		margin-left: 26rpx;
	}
	.nav_box .show_one .tit{
		font-size: 28rpx;
		text-align: center;
		color: #000;
	}
	.nav_box .show_one .active{
		color: #5b83ff;
		font-size: 30rpx;
		font-weight: bold;
	}
	// account
	.dianfei_box{
		padding: 20rpx;
	}
		.dianfei_box .info{
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			font-weight: bold;
		}
	.dianfei_box .info image{
		width: 40rpx;
		height: 40rpx;
		margin-right: 6rpx;
	}
	.dianfei_tit .tips{
		font-weight: normal;
		font-size: 24rpx;
	}
	.input_box{
		height: 70rpx;
		background: #f2f2f2;
		padding-left: 15rpx;
		border-radius: 10rpx;
		margin-top: 18rpx;
		margin-bottom: 26rpx;
		font-size: 28rpx;
	}
	.dianfei_tit{
		font-size: 30rpx;
		color: #3f3f3f;
		height: 48rpx;
		line-height: 48rpx;
		display: flex;
		justify-content: space-between;
	}
	.remark1{
		font-size: 30rpx;
		color: #3f3f3f;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
	}
	.dianfei_tit .to_sel image{
		width: 38rpx;
		height: 38rpx;
		margin-top: 6rpx;
	}
	// show dian
	.show_dian_info{
		width: 100%;
		margin-top: 26rpx;
		margin-bottom: 6rpx;
		overflow: hidden;
	}
	.show_dian_info .one_dian{
		width: 33%;
		float: left;
		margin-bottom: 20rpx;
	}
	.show_dian_info .list_one{
		width: 90%;
		margin-left: 5%;
		border: solid 2rpx #d3d3d3;
		text-align: center;
		font-size: 24rpx;
		border-radius: 12rpx;
	}
	.show_dian_info .has_choose{
		border: solid 2rpx #5b83ff;
		background: #edf8ff;
	}
		.show_dian_info .list_one .title{
			margin-top: 10rpx;
			color: #353535;
			font-weight: 600;
		}
		.show_dian_info .list_one .tit1{
			color: #353535;
			padding: 6rpx;
		}
		.show_dian_info .list_one .tit2{
			color: red;
			font-weight: bolder;
			margin-bottom: 10rpx;
		}
		.sure_buy{
			width: 88%;
			height: 70rpx;
			font-size: 32rpx;
			line-height: 70rpx;
			text-align: center;
			color: #fff;
			border-radius: 50rpx;
			margin-left: 6%;
			background: #5b83ff;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}
		// 充值说明
		.chongzhi_remark{
			padding: 20rpx;
		}
		.chongzhi_remark .title{
			display: flex;
			align-items: center;
			text-align: 28rpx;
			font-weight: bold;
			margin-bottom: 22rpx;
		}
		.chongzhi_remark .title image{
			width: 44rpx;
			height: 44rpx;
			margin-right: 6rpx;
		}
		.chongzhi_remark .show_info{
			font-size: 28rpx;
			color: #3f3f3f;
			line-height: 48rpx;
		}
</style>
