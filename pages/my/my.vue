<template>
	<view class="new-users copy-data" style="height:100%">
			<view class="mid" style="flex:1;overflow: hidden;">
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="head">
						<view class="user-card">
							<view class="bg"></view>
							<view class="" style="padding:0 28rpx;">
								<view class="user-info">
									<view>
										<view class="avatar-box">
											<image class="avatar" :src='headimgurl'></image>
										</view>
									
									</view>
									<view class="info">
									
										<view class="name" v-if="!userInfo.uid" @click="openOauth()"
											style="height: 100%; display: flex; align-items: center;">
											请点击授权
										</view>
										
										<view class="name" v-if="userInfo.uid">
											{{userInfo.nickname}}
										</view>
										<view class="num" v-if="userInfo.mobile" @click="goEdit()">
											<view class="num-txt">tel：{{userInfo.mobile}}</view>
										</view>
										<view class="phone" v-if="!userInfo.mobile && isLogin" @click="bindPhone()">绑定手机号</view>
									</view>
									<view class="message">
										<navigator url="/pages/my/seting/index" hover-class="none">
											<view class="iconfont icon-shezhi"></view>
										</navigator>
									</view>
									<view class="message">
										<navigator url="/pages/my/message/index" hover-class="none">
											<view v-if="orderStateData.message_num" class="num">
												{{orderStateData.message_num >= 100 ? '99+' : orderStateData.message_num}}
											</view>
											<view class="iconfont icon-tixing"></view>
										</navigator>
									</view>
								</view>
							</view>
							
							<view class="num-wrapper">
							
								<view class="num-item" 
									@click="goMenuPage('/pages/my/user_collection/index')">
									<text class="num">{{orderStateData.collect_num || 0}}</text>
									<view class="txt">收藏</view>
								</view>
								<view class="num-item" @click="goMenuPage('/pages/my/user_coupon/index')">
									<text class="num">{{orderStateData.coupon_num || 0}}</text>
									<view class="txt">优惠券</view>
								</view>
								<view class="num-item" @click="goMenuPage('/pages/my/user_jifen/index')">
									<text class="num">{{userInfo.jifen || 0}}</text>
									<view class="txt">积分</view>
								</view>
							</view>
							
							<view class="center_tips">
								<view class="left">
									当前等级
								</view>
								<view class="right">
									{{userInfo.level_name || '普通会员'}}<text class="iconfont icon-gengduo"></text>
								</view>
							</view>	
						</view>
						
						<view class="order-wrapper">
							<view class="order-hd flex">
								<view class="left">订单中心</view>
								<navigator class="right flex" hover-class="none" url="/pages/orders/orders?status=1"
									open-type="navigate">
									查看全部
									<text class="iconfont icon-gengduo"></text>
								</navigator>
							</view>
							<view class="order-bd">
								
									<navigator class="order-item" hover-class="none" @click="goOrderPage(1)">
										<view class="pic">
											<text class="iconfont icon-daifukuan"></text>
											<text class="order-status-num" v-if="orderStateData.wait_pay > 0">{{ orderStateData.wait_pay}}</text>
										</view>
										<view class="txt">待付款</view>
									</navigator>
									<navigator class="order-item" hover-class="none" @click="goOrderPage(2)">
										<view class="pic">
											<text class="iconfont icon-daifahuo"></text>
											<text class="order-status-num" v-if="orderStateData.wait_send > 0">{{ orderStateData.wait_send}}</text>
										</view>
										<view class="txt">已付款</view>
									</navigator>
									<navigator class="order-item" hover-class="none" @click="goOrderPage(4)">
										<view class="pic">
											<text class="iconfont icon-daishouhuo"></text>
											<text class="order-status-num" v-if="orderStateData.wait_finish > 0">{{ orderStateData.wait_finish}}</text>
										</view>
										<view class="txt">已完成</view>
									</navigator>
									<navigator class="order-item" hover-class="none" @click="goOrderAfter()">
										<view class="pic">
											<text class="iconfont icon-shouhou"></text>
											<text class="order-status-num" v-if="orderStateData.after > 0">{{ orderStateData.after}}</text>
										</view>
										<view class="txt">售后/退款</view>
									</navigator>
							</view>
						</view>
					</view>
					<!-- 轮播 -->
					<view class="slider-wrapper" v-if="imgUrls.length>0 && my_banner_status">
						<swiper indicator-dots="true" :autoplay="autoplay" :circular="circular" :interval="interval"
							:duration="duration" indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff">
							<block v-for="(item,index) in imgUrls" :key="index">
								<swiper-item>
									<navigator @click="goMenuPage(item.url)"
										class='slide-navigator acea-row row-between-wrapper' hover-class='none'>
										<image :src="item.pic" class="slide-image"></image>
									</navigator>
								</swiper-item>
							</block>
						</swiper>
					</view>
					<!-- 会员菜单 -->
					<view class="user-menus" style="margin-top: 20rpx;">
						<view class="menu-title">我的服务</view>
						<view class="list-box">
				
								<view class="item" @click="goMenuPage('/pages/my/user_level/index')">
									<image src="/static/user_level.png"></image>
									<text>用户等级</text>
								</view>
								<view class="item" @click="goMenuPage('/pages/my/user_coupon/index')">
									<image src="/static/user_coupon.png"></image>
									<text>优惠券</text>
								</view>
							
								<view class="item" @click="goMenuPage('/pages/my/user_collection/index')">
									<image src="/static/user_collect.png"></image>
									<text>我的收藏</text>
								</view>
								
								<view class="item" @click="goMenuPage('/pages/my/user_jifen/index')">
									<image src="/static/user_jifen.png"></image>
									<text>积分详情</text>
								</view>
								<view class="item" @click="goMenuPage('/pages/my/user_kefu/index')">
									<image src="/static/user_kefu.png"></image>
									<text>联系客服</text>
								</view>
								<view class="item" @click="cleanData()">
									<image src="/static/user_tuiguang.png"></image>
									<text>清除缓存</text>
								</view>
						</view>
					</view>
	
				
					<view class="" style="height:100rpx;"></view>
				</scroll-view>
			</view>
					
		</view>
</template>

<script>
	import {orderState} from "../api/myApi.js";
	export default {
		data() {
			return {
				userInfo:'',
				sysInfo: '',
				is_weixin:false,
				isLogin:false,
				orderStatus:'',
				imgUrls:[],
				orderStateData:'',
				headimgurl:'/static/default_header.png',
			}
		},
		onLoad() {
			this.getOrderState();
		},
		onShow(){
			var userinfo = ''
			var userinfoStr = uni.getStorageSync('userinfo');
			if(userinfoStr != '' && userinfoStr != undefined){
				var userinfo = JSON.parse(userinfoStr);
				this.isLogin = true;
				this.headimgurl = userinfo.headimgurl;
			}
			this.userInfo = userinfo;
			this.sysInfo  = uni.getStorageSync('sysInfo');
			// #ifdef MP-WEIXIN
			this.is_weixin = true;
			// #endif
		},
		methods: {
			goOrderPage(status){
				uni.navigateTo({
					url:"../orders/orders?status="+status
				})
			},
			goOrderAfter(){
				uni.navigateTo({
					url:"../orders/refund"
				})
			},
			goMenuPage(url){
				uni.navigateTo({
					url:url
				})
			},
			openOauth(){
				uni.navigateTo({
					url:"../index/index"
				})
			},
			bindPhone(){
				
			},
			goSeting(){
				uni.navigateTo({
					url:"./seting/index"
				})
			},
			goEdit(){
				uni.navigateTo({
					url:"./seting/userInfo"
				})
			},
			getOrderState(){
				orderState({from:'user'}).then(result=>{
					this.orderStateData = result;
				})
			},
			cleanData(){
				uni.removeStorageSync('openid');
				uni.removeStorageSync('userinfo');
				uni.removeStorageSync('sysInfo');
				uni.removeStorageSync('has_h5_auth_key');
				uni.navigateTo({
					url:"../../index/index"
				})
			}
		},
		
	}
</script>

<style  lang="scss">
	page,
	body {
		height: 100%;
		background:#f8f8f8;
	}

	.height {
		margin-top: -100rpx !important;
	}

	.unBg {
		background-color: unset !important;

		.user-info {
			.info {
				.name {
					color: #333333 !important;
					font-weight: 600;
				}

				.num {
					color: #333 !important;

					.num-txt {
						height: 38rpx;
						background-color: rgba(51, 51, 51, 0.13);
						padding: 0 12rpx;
						border-radius: 16rpx;
					}
				}
			}
		}

		.num-wrapper {
			color: #333 !important;
			font-weight: 600;

			.num-item {
				.txt {
					color: rgba(51, 51, 51, 0.7) !important;
				}
			}
		}

		.message {
			.iconfont {
				color: #333 !important;
			}

			.num {
				color: #fff !important;
				background-color: #1db0fc !important;
			}
		}

		.setting {
			.iconfont {
				color: #333 !important;
			}
		}
	}

	



	.new-users {
		display: flex;
		flex-direction: column;
		height: 100%;

		.sys-head {
			position: relative;
			width: 100%;
			// background: linear-gradient(90deg, $bg-star1 0%, $bg-end1 100%);

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				// background: url("~@/static/images/user-sys.png") no-repeat;
				background: #1db0fc;
				background-size: 100% auto;
				background-position: left bottom;
			}

			.sys-title {
				z-index: 10;
				position: relative;
				height: 43px;
				text-align: center;
				line-height: 43px;
				font-size: 36rpx;
				color: #FFFFFF;
			}
		}

		.head {
			// background: #fff;

			.user-card {
				position: relative;
				width: 100%;
				height: 320rpx;
				margin: 0 auto;
				padding: 35rpx 0rpx 28rpx 0rpx;
				background-image: url("~@/static/center_bg2.png");
				background-size: 100% auto;
				background-color: #1db0fc;

				.user-info {
					z-index: 20;
					position: relative;
					display: flex;

					.headwear {
						position: absolute;
						right: -4rpx;
						top: -14rpx;
						width: 44rpx;
						height: 44rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.live {
						width: 28rpx;
						height: 28rpx;
						margin-left: 20rpx;
					}

					.bntImg {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						text-align: center;
						line-height: 120rpx;
						background-color: unset;
						position: relative;

						.avatarName {
							font-size: 16rpx;
							color: #fff;
							text-align: center;
							background-color: rgba(0, 0, 0, 0.6);
							height: 37rpx;
							line-height: 37rpx;
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
						}
					}

					.avatar-box {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;

						&.on {
							.avatar {
								border: 2px solid #FFAC65;
								border-radius: 50%;
								box-sizing: border-box;
							}
						}
					}

					.avatar {
						position: relative;
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;

					}

					.info {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 20rpx;
						padding: 15rpx 0;

						.name {
							display: flex;
							align-items: center;
							color: #fff;
							font-size: 31rpx;

							.vip {
								margin-left: 10rpx;

								image {
									width: 78rpx;
									height: 30rpx;
									display: block;
								}
							}
						}

						.num {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);

							image {
								width: 22rpx;
								height: 23rpx;
								margin-left: 20rpx;
							}
						}
					}
				}

				.message {
					align-self: flex-start;
					position: relative;
					margin-top: 15rpx;
					margin-right: 20rpx;

					.num {
						position: absolute;
						top: -8rpx;
						left: 18rpx;
						padding: 0 6rpx;
						height: 28rpx;
						border-radius: 12rpx;
						background-color: #fff;
						font-size: 18rpx;
						line-height: 28rpx;
						text-align: center;
						color: #1db0fc;
					}

					.iconfont {
						font-size: 40rpx;
						color: #fff;
					}
				}

				.num-wrapper {
					z-index: 30;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 22rpx;
					// padding: 0 47rpx;
					color: #fff;

					.num-item {
						width: 33.33%;
						text-align: center;

						&~.num-item {
							position: relative;

							&:before {
								content: '';
								position: absolute;
								width: 1rpx;
								height: 28rpx;
								top: 50%;
								margin-top: -14rpx;
								background-color: rgba(255, 255, 255, 0.4);
								left: 0;
							}
						}

						.num {
							font-size: 42rpx;
							font-weight: bold;
						}

						.txt {
							margin-top: 8rpx;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);
						}
					}
				}

				.sign {
					z-index: 200;
					position: absolute;
					right: -12rpx;
					top: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 60rpx;
					background: linear-gradient(90deg, rgba(255, 225, 87, 1) 0%, rgba(238, 193, 15, 1) 100%);
					border-radius: 29rpx 4rpx 4rpx 29rpx;
					color: #282828;
					font-size: 28rpx;
					font-weight: bold;
				}
			}

			.order-wrapper {
				background: #fff;
				margin: 0 30rpx;
				border-radius: 16rpx;
				position: relative;
				margin-top: -10rpx;

				.order-hd {
					justify-content: space-between;
					padding: 30rpx 20rpx 10rpx 30rpx;
					margin-top: 25rpx;
					font-size: 30rpx;
					color: #282828;
					display:flex;

					.left {
						font-weight: bold;
					}

					.right {
						display: flex;
						align-items: center;
						color: #666666;
						font-size: 26rpx;

						.icon-xiangyou {
							margin-left: 5rpx;
							font-size: 26rpx;
						}
					}
				}

				.order-bd {
					display: flex;
					padding: 0 0;
					justify-content:space-around;

					.order-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 20%;
						height: 140rpx;

						.pic {
							position: relative;
							text-align: center;

							.iconfont {
								font-size: 48rpx;
								color: #1db0fc;
							}

							image {
								width: 58rpx;
								height: 48rpx;
							}
						}

						.txt {
							margin-top: 6rpx;
							font-size: 26rpx;
							color: #333;
						}
					}
				}
			}
		}

		.slider-wrapper {
			margin: 20rpx 30rpx;
			height: 130rpx;

			swiper,
			swiper-item {
				height: 100%;
			}

			image {
				width: 100%;
				height: 130rpx;
				border-radius: 16rpx;
			}
		}

		.user-menus {
			background-color: #fff;
			margin: 0 30rpx;
			border-radius: 16rpx;

			.menu-title {
				padding: 30rpx 30rpx 40rpx;
				font-size: 30rpx;
				color: #282828;
				font-weight: bold;
			}

			.list-box {
				display: flex;
				flex-wrap: wrap;
				padding: 0;
				justify-contents:space-around;
			}

			.item {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				width: 33%;
				margin-bottom: 47rpx;
				font-size: 26rpx;
				color: #333333;

				image {
					width: 76rpx;
					height: 76rpx;
					margin-bottom: 16rpx;
				}


				&:last-child::before {
					display: none;
				}
			}

			button {
				font-size: 28rpx;
			}
		}

		.phone {
			color: #fff;
			background-color: #CCC;
			border-radius: 15px;
			width: max-content;
			padding: 0 10px;
			font-size:28rpx;
		}

		.order-status-num {

			min-width: 12rpx;
			background-color: #fff;
			color: #1db0fc;
			border-radius: 15px;
			position: absolute;
			right: -14rpx;
			top: -15rpx;
			font-size: 20rpx;
			padding: 0 8rpx;
			border: 1px solid #1db0fc;
		}

		.support {
			width: 219rpx;
			height: 74rpx;
			margin: 54rpx auto;
			display: block;
		}
	}

	
	.setting {
		margin-top: 15rpx;
		margin-left: 15rpx;
		color: #fff;

		.iconfont {
			font-size: 40rpx;
		}
	}

	.page-footer {
		position: fixed;
		bottom: 0;
		z-index: 30;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		height: calc(98rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		height: calc(98rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
		box-sizing: border-box;
		border-top: solid 1rpx #F3F3F3;
		background-color: #fff;
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
		padding-bottom: constant(safe-area-inset-bottom); ///兼容 IOS<11.2/
		padding-bottom: env(safe-area-inset-bottom); ///兼容 IOS>11.2/

		.foot-item {
			display: flex;
			width: max-content;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			position: relative;

			.count-num {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 40rpx;
				height: 40rpx;
				top: 0rpx;
				right: -15rpx;
				color: #fff;
				font-size: 20rpx;
				background-color: #FD502F;
				border-radius: 50%;
				padding: 4rpx;
			}
		}

		.foot-item image {
			height: 50rpx;
			width: 50rpx;
			text-align: center;
			margin: 0 auto;
		}

		.foot-item .txt {
			font-size: 24rpx;


			&.active {}
		}
	}

	.new-users {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
.center_tips{
	background-image:url("~@/static/center_tips_bg.png");
	background-size:100% 100%;
	height:88rpx;
	position:absolute;
	left:0;
	bottom:-1rpx;
	z-index:568;
	width:100%;
	color:#905100;
	font-size:28rpx;
	display:flex;
	align-items:center;
	justify-content:space-between;
}
.center_tips .left{
	margin-left:120rpx;
}
.center_tips .right{
	margin-right:66rpx;
}
</style>
