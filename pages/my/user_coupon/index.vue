<template>
	<view>
		<view class="popup-content couponpopup">
			<view class="coupon_title">
				<view class="" @click="changeTitle(1)">
					<text :class="titleIndex == 1? 'active':''" >未使用</text>
				</view>
				<view class="none_use"  @click="changeTitle(2)">
					<text :class="titleIndex == 2? 'active':''"  >已使用/过期</text>
				</view>
			</view>
			<view class="coupon-list" v-if="couponData.length>0">
				<view class="item" v-for="(item,index) in couponData" :key="index">
					<view class="money">
						<view><text class="uni">￥</text><text class="show_price">{{item.money}}</text></view>
						<view>满{{item.tiaojian}}元可用</view>
					</view>
					<view class="right">
						<view class="tt1">{{item.title}}234</view>
						<view class="time">{{item.create_time}}</view>
						<view class="">
							<text class="end_time">{{item.end_time}}</text>
							<text class="lingqu bnt_bg1"  @click="lijiUseFunc(item.id,index)" v-if="titleIndex == 1">立即使用</text>
							<text class="lingqu bnt_bg2"  v-if="titleIndex == 2 && item.type==1">已使用</text>
							<text class="lingqu bnt_bg2"  v-if="titleIndex == 2 && item.type==2">已过期</text>
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="no_data"  v-if="couponData.length ==0" style="justify-content: center;display: flex;">
			  <image src="/static/no_data.png" style="margin-top: 160rpx;width: 240rpx;height: 240rpx;"></image>
			</view>
			
			<view style="height: 120rpx;"></view>
		</view>
	</view>
</template>

<script>
	import {getAllCoupon,getUserCoupon} from "../../api/couponApi.js";
	export default {
		data() {
			return {
				has_use:[],
				none_use:[],
				couponData:[],
				titleIndex:1
			}
		},
		onShow() {
				this.getUserCouponFunc();
		},
		methods: {
			getUserCouponFunc(){
				getUserCoupon().then(result => {
					this.has_use = result.has_use;
					this.none_use = result.none_use;
					this.couponData = this.none_use;
				})
			},
			changeTitle(index){
				this.titleIndex = index;
				if(index == 1){
					this.couponData = this.none_use;
				}else{
					this.couponData = this.has_use;
				}
			},
			lijiUseFunc(){
				uni.navigateTo({
					url:"../../search/search"
				})
			}
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
	display: flex;
}
.coupon_title view{
	text-align: center;
	width: 50%;
	height: 88rpx;
}
.coupon_title .active{
	border-bottom: 2rpx solid #ff448f;
	height: 80rpx;
	display: inline-block;
}
.coupon_title .none_use{
	color: #999;
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
		justify-content: flex-end;
}
.coupon-list .item .right .tt1{
	    color: #282828;
			font-size: 28rpx;
			margin-bottom: 32rpx;
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
