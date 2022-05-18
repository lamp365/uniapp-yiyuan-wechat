<template>
	<view class="detail">
		<view class="logo"><image src="../../static/order_detail.png" mode=""></image></view>
		<view class="pay_status">待支付</view>
		<view style="height: 40rpx;"></view>
		<view class="info_line">
			<view class="tit1">充值类型</view><view class="tit2">电费充值</view>
		</view>
		<view class="info_line">
			<view class="tit1">充值账户</view><view class="tit2">电费充值</view>
		</view>
		<view class="info_line">
			<view class="tit1">充值地址</view><view class="tit2">电费充值</view>
		</view>
		<view class="info_line">
			<view class="tit1">充值金额</view><view class="tit2">电费充值</view>
		</view>
		<view class="info_line">
			<view class="tit1">实付金额</view><view class="tit2">电费充值</view>
		</view>
		<view class="info_line">
			<view class="tit1">下单时间</view><view class="tit2">电费充值</view>
		</view>
		<view class="sure_buy">立即支付</view>
		
		<view class="back" @click="gotoMy()"><image src="../../static/back.png" mode=""></image></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoMy(){
				uni.switchTab({
					url:"../my/my"
				})
			},
		}
	}
</script>

<style>
.detail{
	padding: 20rpx 30rpx;
}
.logo{
	margin-top: 16;
	display: flex;
	justify-content: center;
}
.logo image{
	width: 90rpx;
	height: 90rpx;
}
.pay_status{
	font-size: 36rpx;
	font-weight: bolder;
	text-align: center;
	margin-top: 20rpx;
	color: #ff3b00;
	margin-top: 26rpx;
}
.info_line{
	display: flex;
	justify-content: space-between;
	font-size: 30rpx;
	height: 90rpx;
	line-height: 90rpx;
	border-bottom: 2rpx solid #f3f3f3;
}
.info_line .tit1{
	color: #919191;
}
.info_line .tit2{
	color: #282828;
}
.sure_buy{
		width: 94%;
		height: 70rpx;
		font-size: 32rpx;
		line-height: 70rpx;
		text-align: center;
		color: #fff;
		border-radius: 12rpx;
		margin-left: 3%;
		background: #5b83ff;
		margin-top: 36rpx;
		margin-bottom: 20rpx;
}
.back{
	width: 72rpx;
	height: 72rpx;
	position: fixed;
	top: 35rpx;
	right: 30rpx;
	z-index: 999;
}
.back image{
	width: 70rpx;
	height: 70rpx;
}
</style>
