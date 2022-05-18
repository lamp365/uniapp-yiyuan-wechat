<template>
	<view class="content">
		<view class="tit">
			关于我们
		</view>
		<view class="tel">
				xxxxxx平台是一个致力为广大用户，提供便捷优惠充值服务。
		</view>
		<view class="tel">
				平台宗旨：诚信为先，合作共赢
		</view>
		<view class="tel">
				欢迎有志之士与我们合作
		</view>
		<view class="tel">客服电话：18850737047 <text class="call" @click="callPhone()">点击拨打</text></view>
		<view class="show_erweima"><image src="../../static/erweima.png" mode="widthFix"></image></view>
		<view class="sao">扫扫上面的二维码，在线联系</view>
		
		
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
					url:"./my"
				})
			},
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: '18850737047' //仅为示例
				});
			}
		}
	}
</script>

<style>
	.content{
		padding: 20rpx 30rpx;
	}
	.content .tit{
		font-size: 36rpx;
		font-weight: bold;
		color: #000;
		margin-top: 20rpx;
		margin-bottom: 40rpx;
	}
.content .sao{
		font-size: 24rpx;
		color: #b1b1b1;
		text-align: center;
		width: 400rpx;
	}
	.show_erweima image{
		width: 400rpx;
		height: 400rpx;
	}
	.content .tel{
		font-size: 28rpx;
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
	}
	.content .call{
		border: 2rpx solid #e3e3e3;
		padding: 2rpx 8rpx;
		margin-left: 4rpx;
		border-radius: 8rpx;
		background: #e1f3d8;
		color: #09bb07;
	}
	.back{
		width: 72rpx;
		height: 72rpx;
		position: fixed;
		top: 28rpx;
		right: 30rpx;
		z-index: 999;
	}
	.back image{
		width: 70rpx;
		height: 70rpx;
	}
</style>
