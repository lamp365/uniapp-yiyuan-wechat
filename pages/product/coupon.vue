<template>
	<view>
		<view class="popup-content couponpopup">
			<view class="coupon_title">领券中心</view>
			<view class="coupon-list">
				<view class="item" v-for="(item,index) in allCoupon" :key="index">
					<view class="money">
						<view><text class="uni">￥</text><text class="show_price">{{item.money}}</text></view>
						<view>满{{item.tiaojian}}元可用</view>
					</view>
					<view class="right">
						<view class="tt1">{{item.title}}</view>
						<view class="time"></view>
						<view class="">
							<text class="end_time">限时优惠</text>
							<text class="lingqu bnt_bg1" v-if="item.has_get == 0" @click="lingquQuanFunc(item.id,index)">立即领取</text>
							<text class="lingqu bnt_bg2" v-else>已经领取</text>
						</view>
					</view>
				</view>
			
				
			</view>
			<view style="height: 120rpx;"></view>
		</view>
	</view>
</template>

<script>
	import {getAllCoupon,lingQuan} from "../api/couponApi.js";
	export default {
		data() {
			return {
				allCoupon:[],
			}
		},
		onShow() {
				this.getAllCouponFunc();
		},
		methods: {
			getAllCouponFunc(){
				getAllCoupon().then(result => {
					this.allCoupon = result;
				})
			},
		}
	}
</script>

<style>
	page{
		background: #f8f8f8;
	}
/* 优惠券 */
.coupon_title{
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	border-bottom: 2rpx solid #f5f5f5;
	background-color: #fff;
	font-size: 30rpx;
	color: #282828;
	font-weight: 600;
}
.coupon-list{
    padding: 30rpx;
    overflow: auto;
}
.coupon-list .item{
    margin-bottom: 18rpx;
    box-shadow: 0 8rpx 18rpx rgba(0,0,0,.06);
		display: flex;
		height: 170rpx;
		width: 100%;
}
.coupon-list .item .money {
    width: 240rpx;
    height: 100%;
    color: #fff;
    font-size: 24rpx;
    text-align: center;
		font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
		background: #ff448f;
		background-image: url("@/static/coupon_bg.png");
	background-size: 100% 100%;
}
.coupon-list .item .money .uni{
	font-size: 30rpx;
}
.coupon-list .item .money .show_price{
	font-size: 54rpx;
}
.coupon-list .item .right {
    flex: 1;
    padding: 0 18rpx 14rpx 24rpx;
    box-sizing: border-box;
    background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
}
.coupon-list .item .right .tt1{
	    color: #282828;
			font-size: 28rpx;
}
.coupon-list .item .right .time{
	font-size: 20rpx;
	color: #999;
}
.coupon-list .item .right  .end_time{
	font-size: 20rpx;
	color: #999;
	float: left;
}
.coupon-list .item .right .lingqu {
    width: 130rpx;
    height: 44rpx;
    border-radius: 22rpx;
    font-size: 22rpx;
    text-align: center;
    line-height: 44rpx;
    color: #fff;
		float: right;
}
.bnt_bg1{
	background: #ff448f;
}
.bnt_bg2{
	background: #ccc;
}
</style>
