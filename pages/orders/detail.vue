<template>
		<view>
			<view class='order-details'>
				<!-- 给header上与data上加on为退款订单-->
				<view class='header acea-row row-middle'>
					<view class='pictrue'>
						<image src="../../static/send.gif"></image>
					</view>
					<view class='data on'>
						<view class='state'>{{orderInfo.status_msg}}</view>
						<view>{{orderInfo.create_time}}</view>
					</view>
				</view>
				
	
		
				<view>
					<view class="refund">
						<view class="title">
						<text>门店信息：</text>
						</view>
						<view class="con">
							<view>
								<text>联系人：{{orderInfo.snap_address[0]}}</text><text style="float: right;">{{orderInfo.snap_address[1]}}</text>
							</view>
							<view>
								<text>门店名称：{{sysData.shop_name}}</text>
							</view>
							<view style="display: flex;justify-content: space-between">
								<text>联系方式：{{sysData.mobile}}</text>
								<image class="tel_pic" src="../../static/mobile2.png" @click="callMobile()"></image>
							</view>
							<view>
								<text>门店地址：{{sysData.address}}</text>
							</view>
							<view class="daohang_box">
								<text class="daohang">导 航</text>
							</view>
						</view>
					</view>
				</view>
				
				
				
			
		
				
				<view class='line'>
					<image src='@/static/line.jpg'></image>
				</view>
				
				
				<!-- 显示产品 -->
				<view class="orderGoods">
					<view class="showTotal">共{{orderInfo.buy_num}}个项目</view>
					<view class="goodBox" v-for="(item,index) in orderProduct" :key="index">
						<view class="picture"><image :src="item.snap_img" mode=""></image></view>
						<view class="right_info">
							<view class="">
								<view class="detail">
									<view class="title">{{item.snap_name}}</view>
								</view>
							</view>
							
							<view class="">
								<view class="">
										<view class="specName">{{item.spec_name}} x {{item.buy_num}} x {{item.money}}</view>
										<view class="price">￥{{parseFloat(item.money*item.buy_num).toFixed(2)}}</view>
								</view>
								<view class="action_btn" v-if="orderInfo.status>1 && orderInfo.after == 0" @click="gotoApplyed(item.id)">
									申请退款
								</view>
								<view class="action_btn" v-if="orderInfo.after>0" @click="cancleAfterFunc(item.id)">
									取消退款
								</view>
							</view>
							
						</view>
						
					</view>
				
					<view style="height: 16rpx;"></view>
				</view>
				<div class="goodCall" @click="callMobile()">
					联系客服
				</div>
				
			
				<view class='wrapper'>
					<view class='item acea-row row-between'>
						<view>订单编号：</view>
						<view class='conter acea-row row-middle row-right'>
							<text>{{orderInfo.order_no}}</text>
						</view>
					</view>
					<view class='item acea-row row-between'>
						<view>下单时间：</view>
						<view class='conter'>{{orderInfo.create_time}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>支付时间：</view>
						<view class='conter'>{{orderInfo.pay_time == 0? '-' : orderInfo.pay_time}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>支付状态：</view>
						<view class='conter'>{{orderInfo.status_str}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>订单类型：</view>
						<view class='conter'>线上订单</view>
					</view>
					
					<view class='item acea-row row-between' v-if="orderInfo.remark">
						<view>买家留言：</view>
						<view class='conter'>{{orderInfo.remark}}</view>
					</view>
				</view>
				
			
		
				
				<view class='wrapper'>
					<view class='item acea-row row-between'>
						<view>商品总价：</view>
						<view class='conter'>
							￥{{parseFloat(orderInfo.money).toFixed(2)}}</view>
					</view>
					<view class='item acea-row row-between'>
						<view>配送运费：</view>
						<view class='conter'>￥{{parseFloat(orderInfo.yunfei).toFixed(2)}}</view>
					</view>
					<view v-if="orderInfo.youhui > 0" class='item acea-row row-between'>
						<view>商品优惠：</view>
						<view class='conter'>-￥{{parseFloat(orderInfo.youhui).toFixed(2)}}</view>
					</view>
					
					<view class='item acea-row row-between'>
						<view>优惠券抵扣：</view>
						<view class='conter'>-￥{{parseFloat(orderInfo.coupon_money).toFixed(2)}}</view>
					</view>
					<view class='item acea-row row-between' v-if="orderInfo.youhui>0">
						<view>优惠：</view>
						<view class='conter'>-￥{{parseFloat(orderInfo.youhui).toFixed(2)}}</view>
					</view>
					<view class='actualPay acea-row row-right'>
						实付款：<text class='money font-color'>￥{{parseFloat(orderInfo.total_price).toFixed(2)}}</text>
					</view>
				</view>
				<view style='height:120rpx;'></view>
				<view class='footer acea-row row-right row-middle'>
	
					<view class="more" @click="goBack">返回<span class='iconfont icon-xiangshang'></span></view>
					<view class="more-box" v-if="moreBtn">
						<view class="more-btn" >更多信息</view>
					</view>
	
					<view class="qs-btn" v-if="orderInfo.status == 1" @click.stop="deleteOrderFunc()">取消订单</view>
					<view class='bnt bg-color' v-if="orderInfo.status==1" @click='goPay(orderInfo.id)'>立即付款</view>
					
					
					<view class='bnt cancel'	v-if="[2,3].includes(orderInfo.status) && orderInfo.after==0" @click="gotoApplyed(apply_order_id)">
						申请退款
					</view>
					<view class='bnt cancel'	v-if="[2,3].includes(orderInfo.status) && (orderInfo.after==1 || orderInfo.after==2)"  @click="gotoApplyed(refund_order_id)">
						查看售后
					</view>
	
	
					<view class='bnt bg-color' v-if="orderInfo.type==2" @click='goJoinPink'>查看拼团</view>
					<view class='bnt bg-color' v-if="orderInfo.status==3" @click='confirmOrder()'>确认收货</view>
		
					<view class='bnt bg-color refundBnt'
						v-if="[1,2].includes(orderInfo.after) && orderProduct.length==1" @click='cancleAfterFunc(refund_order_id)'>取消退款
					</view>
				</view>
			</view>
						
		</view>
</template>

<script>
 import {orderDetail,deleteOrder,cancleAfter} from "../api/orderApi.js";
	export default {
		data() {
			return {
				order_id: '',				
				orderInfo: {},
				orderProduct:[],
				moreBtn: false,
				refund_order_id:0,
				apply_order_id:0,
				sysData:{}
			}
		},
		onLoad(option) {
			if(option.id){
				this.order_id = option.id;
				this.getOrdeDetailFunc();
			}else{
				uni.showToast({
					title: 参数有误,
					duration: 1500,
					icon: 'error'
				});
				uni.navigateBack({
					delta:1
				})
			}
			this.sysData = uni.getStorageSync('sysInfo');
		},
		methods: {
			getOrdeDetailFunc(){
				orderDetail({id:this.order_id}).then(result=>{
					this.orderInfo = result;
					this.orderProduct = result.product;
					for(var i=0;i<this.orderProduct.length;i++){
						var temp = this.orderProduct[i];
						if(temp.after != 0){
							this.refund_order_id = temp.id;
						}
						if(temp.after == 0){
							this.apply_order_id = temp.id;
						}
					}
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			deleteOrderFunc(){
				//删除订单
				deleteOrder({id:this.order_id}).then(result=>{
					uni.showToast({
						title: result,
						duration: 1500,
						icon: 'success'
					});
					uni.navigateBack({
						delta:1
					})
				})
			},
			goPay(id){
				//更新缓存记录来源
				uni.setStorageSync('jiesuanFromKey',"order|"+this.order_id);
				uni.navigateTo({
					url:"../jiesuan/jiesuan"
				})
			},
			gotoApplyed(id){
				uni.navigateTo({
					url:"./applyed?id="+id
				})
			},
			callMobile(){
				var mobile = this.sysData.mobile;
				uni.makePhoneCall({
					phoneNumber:mobile
				})
			},
			cancleAfterFunc(id){
				var params = {
					id:id
				};
				cancleAfter(params).then(result=>{
					uni.showToast({
						title:"已取消申请",
						duration:1500,
						icon:"success"
					})
					setTimeout(function(){
						uni.navigateTo({
							url:"./orders"
						})
					},1500)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background: #f8f8f8;
	}
	.refund-tip {
		font-size: 24rpx;
		margin-top: 10rpx;
		color: #e93323;

		.iconfont {
			font-size: 24rpx;
			margin-right: 6rpx;
		}
	}

	.refund-tip1 {
		font-size: 24rpx;
		color: #e93323;

		.iconfont {
			font-size: 24rpx;
			margin-right: 6rpx;
		}
	}
.tel_pic{
	width: 40rpx;
	height: 40rpx;
}
	.qs-btn {
		width: auto;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		font-size: 27rpx;
		padding: 0 3%;
		color: #666;
		border: 1px solid #ccc;
		margin-right: 20rpx;
	}

	.refund-input {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-radius: 16rpx 16rpx 0 0;
		background-color: #fff;
		z-index: 99;
		padding: 40rpx 0 70rpx 0;
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		transform: translate3d(0, 100%, 0);

		.refund-input-title {
			font-size: 32rpx;
			margin-bottom: 60rpx;
			color: #282828;
		}

		.refund-input-sty {
			border: 1px solid #ddd;
			padding: 20rpx 20rpx;
			border-radius: 40rpx;
			width: 100%;
			margin: 20rpx 65rpx;
		}

		.input-msg {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			margin: 0 65rpx;

			.iconfont {
				position: absolute;
				font-size: 32rpx;
				color: #282828;
				top: 8rpx;
				right: -30rpx;
			}
		}

		.refund-bth {
			display: flex;
			margin: 0 65rpx;
			margin-top: 20rpx;
			justify-content: space-around;
			width: 100%;

			.close-refund {
				padding: 24rpx 80rpx;
				border-radius: 80rpx;
				color: #fff;
				background-color: #ccc;
			}

			.submit-refund {
				width: 100%;
				padding: 24rpx 0rpx;
				text-align: center;
				border-radius: 80rpx;
				color: #fff;
				background-color: #e93323;
			}
		}
	}

	.refund-input.on {
		transform: translate3d(0, 0, 0);
	}

	.goodCall {
		color: #e93323;
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-top: 1rpx solid #eee;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;

		.icon-kefu {
			font-size: 36rpx;
			margin-right: 15rpx;
		}

		/* #ifdef MP */
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			font-size: 30rpx;
			color: #e93323;
		}

		/* #endif */
	}

	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		background: #1db0fc;
	}

	.order-details .header.on {
		background-color: #666 !important;
	}

	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}

	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}

	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
		margin-left: 27rpx;
	}

	.order-details .header .data.on {
		margin-left: 0;
	}

	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}

	.order-details .header .data .time {
		margin-left: 20rpx;
	}

	.order-details .nav {
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}

	.order-details .nav .navCon {
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
	}

	.order-details .nav .on {
		color: #e93323;
	}
.bg-color{
	background: #e93323 !important;
}

	.order-details .nav .progress .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}

	.order-details .nav .progress .iconfont {
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}

	.order-details .address {
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		margin-top: 13rpx;
		padding: 35rpx 30rpx;
		margin-bottom: 12rpx;
	}

	.order-details .address .name {
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}

	.order-details .address .name .phone {
		margin-left: 40rpx;
	}

	.order-details .line {
		width: 100%;
		height: 3rpx;
		margin-top: 10rpx;
	}

	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}

	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
		display: flex;
		justify-content: space-between;
	}

	.order-details .wrapper .item~.item {
		margin-top: 20rpx;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
	}

	.order-details .wrapper .item .conter {
		color: #868686;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
	}

	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		border-radius: 3rpx;
		border: 1rpx solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;
		white-space: nowrap;
	}

	.order-details .wrapper .actualPay {
		border-top: 1rpx solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.pay-people {
			display: flex;
			align-items: center;

			image {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
			}

			.pay-nickname {
				margin-right: 20rpx;
				padding: 0 10rpx;
			}
		}
	}

	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30rpx;
	}

	.order-details .footer {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		border-top: 1rpx solid #eee;
		.more {
			position: absolute;
			left: 30rpx;
			font-size: 26rpx;
			color: #333;

			.icon-xiangshang {
				margin-left: 6rpx;
				font-size: 22rpx;
			}
		}

		.more-box {
			color: #333;
			position: absolute;
			left: 30rpx;
			bottom: 110rpx;
			background-color: #fff;
			padding: 18rpx 24rpx;
			border-radius: 4rpx;
			font-size: 28rpx;
			-webkit-box-shadow: 0px 0px 3px 0px rgba(200, 200, 200, 0.75);
			-moz-box-shadow: 0px 0px 3px 0px rgba(200, 200, 200, 0.75);
			box-shadow: 0px 0px 3px 0px rgba(200, 200, 200, 0.75);

			.more-btn {
				color: #333;
				padding: 4rpx;
				z-index: 9999;
			}
		}

		.more-box:before {
			content: "";
			width: 0rpx;
			height: 0rpx;
			border-top: 20rpx solid rgba(200, 200, 200, 0.4);
			border-bottom: 0rpx solid transparent;
			border-top: 20rpx solid rgba(200, 200, 200, 0.4);
			border-left: 20rpx solid rgba(0, 0, 0, 0);
			border-right: 20rpx solid rgba(0, 0, 0, 0);
			position: absolute;
			bottom: -20rpx;
			left: 20rpx;
		}

		.more-box::after {
			content: "";
			width: 0rpx;
			height: 0rpx;
			border-top: 20rpx solid #fff;
			border-bottom: 0rpx solid rgba(0, 0, 0, 0);
			border-left: 20rpx solid rgba(0, 0, 0, 0);
			border-right: 20rpx solid rgba(0, 0, 0, 0);
			position: absolute;
			bottom: -18rpx;
			left: 20rpx;
			z-index: 9;
		}
	}

	.order-details .footer .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
	}

	.order-details .footer .bnt.refundBnt {
		width: 210rpx;
	}

	.order-details .footer .bnt.cancel {
		color: #666;
		border: 1rpx solid #ccc;
	}

	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
	}

	.order-details .writeOff {
		background-color: #fff;
		margin-top: 13rpx;
		padding-bottom: 30rpx;
	}

	.order-details .writeOff .title {
		font-size: 30rpx;
		color: #282828;
		height: 87rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30rpx;
		line-height: 87rpx;
	}

	.order-details .writeOff .grayBg {
		background-color: #f2f5f7;
		width: 590rpx;
		height: 384rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: 50rpx auto 0 auto;
		padding-top: 55rpx;
		position: relative;
	}

	.order-details .writeOff .grayBg .written {
		position: absolute;
		top: 0;
		right: 0;
		width: 60rpx;
		height: 60rpx;
	}

	.order-details .writeOff .grayBg .written image {
		width: 100%;
		height: 100%;
	}

	.order-details .writeOff .grayBg .pictrue {
		width: 290rpx;
		height: 290rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .grayBg .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .gear {
		width: 590rpx;
		height: 30rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .gear image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .num {
		background-color: #f0c34c;
		width: 590rpx;
		height: 84rpx;
		color: #282828;
		font-size: 48rpx;
		margin: 0 auto;
		border-radius: 0 0 20rpx 20rpx;
		text-align: center;
		padding-top: 4rpx;
	}

	.order-details .writeOff .rules {
		margin: 46rpx 30rpx 0 30rpx;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;
	}

	.order-details .writeOff .rules .item {
		margin-top: 20rpx;
	}

	.order-details .writeOff .rules .item .rulesTitle {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .writeOff .rules .item .rulesTitle .iconfont {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
		margin-top: 5rpx;
	}

	.order-details .writeOff .rules .item .info {
		font-size: 28rpx;
		color: #999;
		margin-top: 7rpx;
	}

	.order-details .writeOff .rules .item .info .time {
		margin-left: 20rpx;
	}

	.order-details .map {
		height: 86rpx;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: 13rpx;
		background-color: #fff;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.order-details .map .place {
		font-size: 26rpx;
		width: 176rpx;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.order-details .map .place .iconfont {
		font-size: 27rpx;
		height: 27rpx;
		line-height: 27rpx;
		margin: 2rpx 3rpx 0 0;
	}

	.order-details .address .name .iconfont {
		font-size: 34rpx;
		margin-left: 10rpx;
	}

	.refund {
		padding: 0 30rpx 30rpx;
		margin: 12rpx 0;
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			height: 86rpx;
			border-bottom: 1px solid #f5f5f5;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}

		.con {
			padding-top: 20rpx;
			font-size: 28rpx;
			color: #868686;
			line-height: 46rpx;
		}
	}
</style>

<style scoped lang="scss">
	.invoice-mask {
		background-color: #999999;
		opacity: 1;
	}

	.more-mask {
		background-color: #fff;
		opacity: 0;
		left: 160rpx;
	}

	.goodCall {
		color: #e93323;
		text-align: center;
		width: 100%;
		height: 86rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 30rpx;
		line-height: 86rpx;
		background: #fff;

		.icon-kefu {
			font-size: 36rpx;
			margin-right: 15rpx;
		}

		/* #ifdef MP */
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 86rpx;
			font-size: 30rpx;
			color: #e93323;
		}

		/* #endif */
	}

	.order-details .header {
		padding: 0 30rpx;
		height: 150rpx;
	}

	.order-details .header.on {
		background-color: #666 !important;
	}

	.order-details .header .pictrue {
		width: 110rpx;
		height: 110rpx;
	}

	.order-details .header .pictrue image {
		width: 100%;
		height: 100%;
	}

	.order-details .header .data {
		color: rgba(255, 255, 255, 0.8);
		font-size: 24rpx;
		margin-left: 27rpx;
	}

	.order-details .header .data.on {
		margin-left: 0;
	}

	.order-details .header .data .state {
		font-size: 30rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 7rpx;
	}

	.order-details .header .data .time {
		margin-left: 20rpx;
	}

	.order-details .nav {
		background-color: #fff;
		font-size: 26rpx;
		color: #282828;
		padding: 25rpx 0;
	}

	.order-details .nav .navCon {
		padding: 0 40rpx;
	}

	.order-details .nav .on {
		color:#e93323;
	}

	.order-details .nav .progress {
		padding: 0 65rpx;
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
}

	.order-details .nav .progress .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #939390;
	}

	.order-details .nav .progress .iconfont {
		font-size: 25rpx;
		color: #939390;
		margin-top: -2rpx;
	}

	.order-details .address {
		font-size: 26rpx;
		color: #868686;
		background-color: #fff;
		margin-top: 13rpx;
		padding: 35rpx 30rpx;
	}

	.order-details .address .name {
		font-size: 30rpx;
		color: #282828;
		margin-bottom: 15rpx;
	}

	.order-details .address .name .phone {
		margin-left: 40rpx;
	}

	.order-details .line {
		width: 100%;
		height: 3rpx;
	}

	.order-details .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .wrapper {
		background-color: #fff;
		margin-top: 12rpx;
		padding: 30rpx;
	}

	.order-details .wrapper .item {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .wrapper .item~.item {
		margin-top: 20rpx;
	}

	.order-details .wrapper .item .conter {
		color: #868686;
		width: 460rpx;
		text-align: justify;
	}

	.order-details .wrapper .item .conter .copy {
		font-size: 20rpx;
		color: #333;
		border-radius: 3rpx;
		border: 1rpx solid #666;
		padding: 3rpx 15rpx;
		margin-left: 24rpx;
	}

	.order-details .wrapper .actualPay {
		border-top: 1rpx solid #eee;
		margin-top: 30rpx;
		padding-top: 30rpx;
	}

	.order-details .wrapper .actualPay .money {
		font-weight: bold;
		font-size: 30rpx;
	}

	.order-details .footer {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.order-details .footer .bnt {
		width: 150rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50rpx;
		color: #fff;
		font-size: 27rpx;
	}

	.order-details .footer .bnt~.bnt {
		margin-left: 18rpx;
	}

	.order-details .writeOff {
		background-color: #fff;
		margin-top: 13rpx;
		padding-bottom: 30rpx;
	}

	.order-details .writeOff .title {
		font-size: 30rpx;
		color: #282828;
		height: 87rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 30rpx;
		line-height: 87rpx;
	}

	.order-details .writeOff .grayBg {
		background-color: #f2f5f7;
		width: 590rpx;
		height: 384rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: 50rpx auto 0 auto;
		padding-top: 55rpx;
		position: relative;
	}

	.order-details .writeOff .grayBg .written {
		position: absolute;
		top: 0;
		right: 0;
		width: 60rpx;
		height: 60rpx;
	}

	.order-details .writeOff .grayBg .written image {
		width: 100%;
		height: 100%;
	}

	.order-details .writeOff .grayBg .pictrue {
		width: 290rpx;
		height: 290rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .grayBg .pictrue image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .gear {
		width: 590rpx;
		height: 30rpx;
		margin: 0 auto;
	}

	.order-details .writeOff .gear image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.order-details .writeOff .num {
		background-color: #f0c34c;
		width: 590rpx;
		height: 84rpx;
		color: #282828;
		font-size: 48rpx;
		margin: 0 auto;
		border-radius: 0 0 20rpx 20rpx;
		text-align: center;
		padding-top: 4rpx;
	}

	.order-details .writeOff .rules {
		margin: 46rpx 30rpx 0 30rpx;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;
	}

	.order-details .writeOff .rules .item {
		margin-top: 20rpx;
	}

	.order-details .writeOff .rules .item .rulesTitle {
		font-size: 28rpx;
		color: #282828;
	}

	.order-details .writeOff .rules .item .rulesTitle .iconfont {
		font-size: 30rpx;
		color: #333;
		margin-right: 8rpx;
		margin-top: 5rpx;
	}

	.order-details .writeOff .rules .item .info {
		font-size: 28rpx;
		color: #999;
		margin-top: 7rpx;
	}

	.order-details .writeOff .rules .item .info .time {
		margin-left: 20rpx;
	}

	.order-details .map {
		height: 86rpx;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		border-bottom: 1px solid #f0f0f0;
		margin-top: 13rpx;
		background-color: #fff;
		padding: 0 30rpx;
	}

	.order-details .map .place {
		font-size: 26rpx;
		width: 176rpx;
		height: 50rpx;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.order-details .map .place .iconfont {
		font-size: 27rpx;
		height: 27rpx;
		line-height: 27rpx;
		margin: 2rpx 3rpx 0 0;
	}

	.order-details .address .name .iconfont {
		font-size: 34rpx;
		margin-left: 10rpx;
	}

	.refund {
		padding: 0 30rpx 30rpx;
		margin: 12rpx 0;
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #333;
			height: 86rpx;
			border-bottom: 1px solid #f5f5f5;

			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}

		.con {
			padding-top: 25rpx;
			font-size: 28rpx;
			color: #868686;
		}
	}

	.refund-msg {
		background-color: #fff;
		padding: 20rpx 40rpx;
		font-size: 28rpx;

		.refund-msg-user {
			font-weight: bold;
			margin-bottom: 10rpx;

			.copy-refund-msg {
				font-size: 10px;
				border-radius: 1px;
				border: 0.5px solid #666;
				padding: 1px 7px;
				margin-left: 12px;
			}

			.name {
				margin-right: 20rpx;
			}
		}

		.refund-address {
			color: #868686;
		}
	}

	.upload .pictrue {
		display: inline-block;
		margin: 22rpx 17rpx 20rpx 0;
		width: 156rpx;
		height: 156rpx;
		color: #bbb;
	}

	.upload .pictrue image {
		width: 100%;
		height: 100%;
	}
	.orderGoods{background: #fff;}
	.orderGoods .showTotal{
		padding: 0 30rpx;
		border-bottom: 2rpx solid #f0f0f0;
		font-size: 30rpx;
		color: #282828;
		line-height: 86rpx;
		box-sizing: border-box;
	}
.orderGoods .goodBox{
	display: flex;
	padding: 26rpx 26rpx 6rpx 26rpx;
	justify-content: space-between;
}
.orderGoods .goodBox .picture image{
	width: 130rpx;
	height: 130rpx;
	border-radius: 16rpx;
	margin-right: 12rpx;
}
.orderGoods .goodBox .right_info{
	flex: 1;
}
.orderGoods .goodBox .right_info>view{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.orderGoods .goodBox .detail{
	flex: 1;
	font-size: 28rpx;
	color: #282828;
}
.orderGoods .goodBox  .title{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.orderGoods .goodBox .specName{
	font-size: 24rpx;
	color: #868686;
	margin-top: 6rpx;
}
.orderGoods .goodBox .showNum{
	width: 80rpx;
	font-size: 26rpx;
	color: #868686;
	text-align: right;
}
.orderGoods .goodBox .price{
	color: #e93323;
	font-size: 26rpx;
	margin-top: 16rpx;
}

.action_btn{
	line-height: 30rpx;
	color: #e93323;
	font-size: 18rpx;
	border: 2rpx solid #e93323;
	border-radius: 30rpx;
	padding: 2rpx 22rpx;
	margin-left: 10rpx;
}
.yuandianxiao {
    font-size: 20rpx;
    color:#999999;
  }
.yuandianxiao:before{
	content:'';
	display: block;
	width:10rpx;
	height:10rpx;
	background:#999999;
	border-radius: 50%;
}
.yuandianxiao_act {
	font-size: 20rpx;
	color:#e93323;
  }
.yuandianxiao_act:before{
		content:'';
		display: block;
		width:10rpx;
		height:10rpx;
		background:#e93323;
		border-radius: 50%;
	}
.daohang_box{
	display: flex;
	justify-content: flex-end;
}
.daohang{
	padding: 4rpx 28rpx;
	border-radius: 40rpx;
	border: 2rpx solid #a19a9a;
}
</style>
