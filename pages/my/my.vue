<template>
	<view class="box">
		<view class="header">
			<view style="height: 50rpx;"></view>
			<view class="face_box"><image src="../../static/default_header.png"></image><text>欢迎登录</text></view>
			
			<view class="youhui_box">
				<view class="cont">
					<view class="left"></view>
					<view class="right">致力为广大用户提供便捷充值</view>
				</view>
			</view>
		</view>
		
		<view class="main_box">
			<view class="main">
			
				<view class="line" @click="gotoOrder()">
					<view class="tit"><image src="../../static/order2.png" mode=""></image><text>我的订单</text></view>
					<view class="more"><image src="../../static/more.png" mode=""></image></view>
				</view>
				<view class="line">
					<view class="tit"><image src="../../static/jiaofei.png" mode=""></image><text>缴费账户</text></view>
					<view class="more"><image src="../../static/more.png" mode=""></image></view>
				</view>
				<view class="line" @click="gotoMessage()">
					<view class="tit"><image src="../../static/message.png" mode=""></image><text>消息中心</text></view>
					<view class="more"><image src="../../static/more.png" mode=""></image></view>
				</view>
				<view class="line" @click="gotoYeji()">
					<view class="tit"><image src="../../static/daili.png" mode=""></image><text>我的业绩</text></view>
					<view class="more"><image src="../../static/more.png" mode=""></image></view>
				</view>
				<view class="line"  @click="gotoHelp()">
					<view class="tit"><image src="../../static/help.png" mode=""></image><text>帮助说明</text></view>
					<view class="more"><image src="../../static/more.png" mode=""></image></view>
				</view>
				<view class="line" @click="gotoAbout()">
					<view class="tit"><image src="../../static/about.png" mode=""></image><text>关于我们</text></view>
					<view class="more"><image src="../../static/more.png" mode=""></image></view>
				</view>
				
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoOrder(){
				uni.switchTab({
					url:"../orders/orders"
				})
			},
			gotoHelp(){
				uni.navigateTo({
					url:"./help"
				})
			},
			gotoAbout(){
				uni.navigateTo({
					url:"./about"
				})
			},
			gotoMessage(){
				uni.navigateTo({
					url:"./message"
				})
			},
			gotoYeji(){
				uni.navigateTo({
					url:"../yeji/yeji"
				})
			}
		}
	}
</script>

<style>
	page{
		background: #F8F8F8;
	}
.header{
	height: 400rpx;
	width: 100%;
	background: url(../../static/center_bg.png) no-repeat;
	background-size: 100% 400rpx;
	position: relative;
}
.face_box{
	display: flex;
	padding: 30rpx;
	font-size: 42rpx;
	font-weight: bold;
	color: #fff;
	align-items: center;
}
.face_box image{
	height: 120rpx;
	width: 120rpx;
	margin-right: 16rpx;
}
/* 优惠信息 */
.youhui_box{
	position: absolute;
	bottom: -14rpx;
	left: 4%;
	width: 92%;
	height: 100rpx;
	background: url(../../static/youhui.png) no-repeat;
	background-size: 100% 100rpx;
}
.youhui_box .cont{
	padding: 20rpx 20rpx;
	display: flex;
	font-size: 34rpx;
	align-items: center;
}
.youhui_box .cont .left{
	width: 180rpx;
}
.youhui_box .cont .right{
	color: #fef5d6;
	font-weight: 700;
	height: 60rpx;
	line-height: 60rpx;
}
.main_box{
	margin-top: 10rpx;
	padding: 30rpx;
}
.main{
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx 0rpx 20rpx 0rpx;
}
.line{
	height: 80rpx;
	line-height: 80rpx;
	display: flex;
	align-items: center;
	font-size: 30rpx;
	color: #000;
	justify-content: space-between;
	padding-left: 20rpx;
	padding-right: 20rpx;
}
.tit{
	display: flex;
	align-items: center;
}
.tit image{
	width: 44rpx;
	height: 44rpx;
	margin-right: 10rpx;
}
.more image{
	width: 60rpx;
	height: 60rpx;
	margin-top: 20rpx;
}

</style>
