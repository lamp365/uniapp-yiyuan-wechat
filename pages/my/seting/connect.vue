<template>
	<view style="padding: 0 20rpx;">
		<view style="height: 60rpx;"></view>
		<view class="fuwu">{{sysInfo.shop_name}}</view>
		<view class="short">您的满意是我们服务的动力</view>
		
		<view class="li_box">
			<view class="one"><view class="bg">售前服务</view></view>
			<view class="one"><view class="bg">售中服务</view></view>
			<view class="one"><view class="bg">售后服务</view></view>
		</view>
		
		<view class="erweima_box">
			<view class="erweima_main">
				<image :src="sysInfo.erweima" mode="widthFix"></image>
				<view class="kefu">客服微信</view>
			</view>
		</view>
		
		<view class="tips">扫一扫微信二维码，获取更多咨询服务</view>
		
		<view class="xian"></view>
		<view class="contect" @click="callPhone()">
			<image src="/static/tel.png" mode=""></image>
			<view class="us">联系我们</view>
		</view>
	</view>
</template>

<script>
		import {getShopInfo} from "../../api/indexApi.js";
	export default {
		data() {
			return {
				sysInfo:{}
			}
		},
		onLoad() {
			var sys_Info = uni.getStorageSync('sysInfo');
			if(sys_Info == '' || sys_Info == undefined || sys_Info == null){
				getShopInfo().then(result=>{
					this.sysInfo = result;
					uni.setStorageSync(
					    'sysInfo',result
					)
				})
			}else{
				this.sysInfo = sys_Info;
			}
			console.log(this.sysInfo)
		},
		methods: {
			callPhone(){
				uni.makePhoneCall({
					phoneNumber:this.sysInfo.mobile
				})
			}
		}
	}
</script>

<style>
.fuwu{
	font-size: 32rpx;
	font-weight: bold;
	color: #1db0fc;
	text-align: center;
}
.short{
	text-align: center;
	font-size: 28rpx;
	color: #686868;
	margin-top: 20rpx;
}
.li_box{
	display: flex;
	justify-content: center;
	margin-top: 6rpx;
}
.li_box .one{
	padding: 6rpx 12rpx;
	font-size: 20rpx;
	color: #fff;
}
.li_box .one .bg{
	background: #75caf5;
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
}

.erweima_box{
	display: flex;
	justify-content: center;
	margin-top: 40rpx;
}
.erweima_main{
	width: 300rpx;
	height: 350rpx;
	border-radius: 12rpx;
	box-shadow: 0 0 30rpx -10rpx ;
	text-align: center;
	color: #000;
	font-size: 20rpx;
}
.erweima_main image{
	width: 90%;
	margin-left: 2%;
	margin-top: 20rpx;
}
.erweima_main .kefu{
	margin-top: 8rpx;
}
.tips{
	font-size: 20rpx;
	color: #686868;
	margin-top: 40rpx;
	text-align: center;
}
.xian{
	height: 50rpx;
	border-bottom: 2rpx dashed  #dedede ;
}
.contect{
	height: 80rpx;
	background: #1db0fc;
	border-radius: 16rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 35rpx;
}
.contect image{
	width: 36rpx;
	height: 36rpx;
}
.contect .us{
	color: #fff;
	font-size: 32rpx;
	padding-left: 14rpx;
}
</style>
