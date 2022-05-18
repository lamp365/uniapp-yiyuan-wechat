<template>
	<view class="box">
			<view class="hlp_tit">帮助中心</view>
			<uni-collapse  accordion v-model="accordionVal" @change="change">
				<uni-collapse-item title="在线客服一般什么时候在线？">
					<view class="content">
						<text class="text">客服上班时间：9:30~22:00。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="充了电费多久能到账？" class="show_tit">
					<view class="content">
						<text class="text">由于每一单都要审核，账户无误，是否欠费情况，才能进行推单，所以基本快的几个小时内，或者慢的需要24-72小时，如不能推单，会退会钱款。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="充值成功或者失败,怎么通知？">
					<view class="content">
						<text class="text">成功或者失败了，我们公众号都会下发一条系统通知信息，到您微信。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="电费充值,每天可以充多少？">
					<view class="content">
						<text class="text">【南方电网】用户，每天上限4000元，如您用电量大，一次性充10000元，则分为几天内分批到账。【国家电网】用户，每天上限10000元。如有问题，请咨询下方在线客服</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="可不可以加入你们？">
					<view class="content">
						<text class="text">欢迎您的加入，详情可联系在线客服，详谈</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
				
				<view class="back" @click="gotoMy()"><image src="../../static/back.png" mode=""></image></view>
				<view class="liji_kefu"  @click="toggle('center')"><image src="../../static/kefu2.png" mode=""></image><text>在线客服</text></view>
				
				<view>
					<!-- 普通弹窗 -->
					<uni-popup ref="popup" background-color="#fff" @change="change">
						<view class="popup-content">
							<view class="tit">
								在线客服
							</view>
							<view class="tel">客服电话：18850737047 <text class="call" @click="callPhone()">点击拨打</text></view>
							<view class="show_erweima"><image src="../../static/erweima.png" mode="widthFix"></image></view>
							<view class="sao">扫扫上面的二维码，联系在线客服</view>
						</view>
					</uni-popup>
				</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accordionVal:'1',
			}
		},
		methods: {
			change(e) {
				console.log(e);
			},
			gotoMy(){
				uni.switchTab({
					url:"./my"
				})
			},
			toggle(type) {
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: '18850737047' //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss">
	.box{
		padding: 30rpx;
	}
	.hlp_tit{
		font-size: 36rpx;
		font-weight: bold;
		color: #000;
		margin-top: 20rpx;
		margin-bottom: 40rpx;
	}
	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.content {
		padding: 15px;
		color: #818181;
	}

	.text {
		font-size: 14px;
		line-height: 20px;
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
	.liji_kefu{
		height: 90rpx;
		line-height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #000;
		border-top: 2rpx solid #bababa;
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		left: 0rpx;
		z-index: 999;
	}
	.liji_kefu image{
		width: 44rpx;
		height: 44rpx;
		margin-right: 10rpx;
	}
	.popup-content{
		width: 480rpx;
		padding: 20rpx 30rpx;
		border-radius: 16rpx;
	}
	.popup-content .tit{
		text-align: center;
		font-size: 36rpx;
	}
	.popup-content .sao{
		font-size: 24rpx;
		color: #b1b1b1;
		text-align: center;
	}
	.show_erweima image{
		width: 100%;
	}
	.popup-content .tel{
		font-size: 28rpx;
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
	}
	.popup-content .call{
		border: 2rpx solid #e3e3e3;
		padding: 2rpx 8rpx;
		margin-left: 4rpx;
		border-radius: 8rpx;
		background: #e1f3d8;
		color: #09bb07;
	}
</style>

