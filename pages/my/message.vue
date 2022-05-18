<template>
	<view  class="content">
		<view class="tit">
			消息中心
		</view>
		<uni-list>
			<uni-list-item title="订单号0213465465提交订单" note="2022-10-25 12:50:01" rightText="等待审核" />
			<uni-list-item title="订单号0213465465退款成功" note="2022-10-25 12:50:01" rightText="充值失败" />
			<uni-list-item title="订单号0213465465审核完毕" note="2022-10-25 12:50:01" rightText="充值成功" />
			<uni-list-item title="订单号0213465465申请退款" note="2022-10-25 12:50:01" rightText="充值失败" />
		</uni-list>
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
