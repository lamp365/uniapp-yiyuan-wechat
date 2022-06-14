<template>
		<view>
			<view class="my-order">
				<view class="header bg-color">
					<view class="picTxt acea-row row-between-wrapper">
						<view class="text">
							<view class="name">售后订单</view>
							<view>售后订单：{{ orderData.order_num || 0 }} </view>
						</view>
						<view class="pictrue">
							<image src="../../static/orderTime.png"></image>
						</view>
					</view>
				</view>
				<view class="nav acea-row row-around">
					<view class="item" :class="after == 0 ? 'on' : ''" @click="statusClick(1)">
						<view>全部</view>
						<view class="num">{{ orderData.all_after || 0 }}</view>
					</view>
					<view class="item" :class="(after == 1 || after ==2) ? 'on' : ''" @click="statusClick(2)">
						<view>申请中</view>
						<view class="num">{{ orderData.applyed || 0 }}</view>
					</view>
					<view class="item" :class="after == -1 ? 'on' : ''" @click="statusClick(3)">
						<view>已退款</view>
						<view class="num ">{{ orderData.finish || 0 }}</view>
					</view>
					<view class="item" :class="after == -2 ? 'on' : ''" @click="statusClick(3)">
						<view>已拒绝</view>
						<view class="num ">{{ orderData.refuse || 0 }}</view>
					</view>
				</view>
				<view class="list" v-if="orderList.length>0">
					<view class="item" v-for="(item, index) in orderList" :key="index">
						<view>
							<view class="title acea-row row-between-wrapper">
								<view class="acea-row row-middle">
									<text class="sign cart-color acea-row row-center-wrapper" v-if="item.type_str != ''">{{item.type_str}}</text>
			
									<view>{{ item.create_time}}</view>
								</view>
							
								<view v-if="item.status == 1" class="font-color">待付款</view>
								<view v-else-if="item.status == 2" class="font-color">待发货
									<text v-if="item.after">退款中</text>
								</view>
								<view v-else-if="item.status == 3" class="font-color">待收货</view>
				
								<view v-else-if="item.status == 4" class="font-color">已完成</view>	
							</view>
							<view class="item-info acea-row row-between row-top" v-for="(items, index2) in item.productInfo" :key="index2" @click="goProductDetail(items.product_id)">
								<view class="pictrue">
									<image :src="items.snap_img"></image>
								</view>
								<view class="text  row-between">
									<view class="name line2">
										<view class="">
											{{ items.snap_name }}
										</view>	
										<view class="show_spec">
											规格：{{ items.spec_name }}
										</view>	
									</view>
									<view class="money">
							
										<view>￥{{ items.money }}</view>
										<view>x{{ items.buy_num }}</view>
										<view v-if="items.after != 0" class="return">
											退款单
										</view>
									</view>
								</view>
							</view>
							<view class="totalPrice">
								共{{ item.buy_num || 0 }}件商品，总金额
								<text class="money">￥{{ item.total_price}}</text>
							</view>
						</view>
						<view class="bottom acea-row row-right row-middle">
							<view class="bnt cancelBnt" v-if="item.status == 1 "
								@click="cancelOrder(item.id,index)">取消订单</view>
								
							<view class="bnt bg-color" v-if="item.status == 1"
								@click="goPay(item.id)">立即付款</view>
						
			
								
							<view class="bnt bg-color" @click="goOrderDetails(item.id)">查看详情</view>
						</view>
					</view>
				</view>
				
				<view class="loadingicon" v-if="orderList.length > 0">
					<view class="c_loading">
						<text class="iconfont icon-jiazaizhong" v-if="loading"></text>
					</view>	
					<view class="c_loadTitle">
						{{ loadTitle }}
					</view>	
					
				</view>
				<view v-if="orderList.length == 0">
					<view class="no_data" style="justify-content: center;display: flex;">
					  <image src="../../static/no_data.png" style="margin-top: 160rpx;width: 240rpx;height: 240rpx;"></image>
					</view>
				</view>
			</view>
			
			<view style="height: 40rpx;"></view>
			<view class="goback"><text class="iconfont icon-back" @click="gotoMy()"></text></view>
		</view>
</template>

<script>
	import {getOrderList,deleteOrder,oneMorePay} from "../api/orderApi.js";
	import {orderState} from "../api/myApi.js";
	export default {
		data() {
			return {
				orderData:'',
				orderStatus:1,
				orderList:[],
				loadTitle:'------我也是有底线的------',
				tempTitle:'------我也是有底线的------',
				page:1,
				loading:false,
				has_finish:false
			}
		},
		onShow() {
			orderState({from:'order'}).then(result=>{
				this.orderData = result;
			}) 
		},
		onLoad: function(options) {
			if (options.status) 
					this.orderStatus = options.status;
				
				this.getOrderData();
		},
		methods: {
			goOrderDetail(id){
				uni.navigateTo({
					url:"../orders/detail?id="+id
				})
			},
			goProductDetail(id){
				uni.navigateTo({
					url:"../product/product?id="+id
				})
			},
			getOrderData(){
				var status = this.orderStatus;
				var params = {
					status:status,
					page:this.page
				}
				this.loading = true;
				this.loadTitle = "加载中";
				getOrderList(params).then(result=>{
					this.loading = false;
					this.loadTitle = this.tempTitle;
					
					if(result.length < 1){
							this.has_finish = true;
						}else{
							this.has_finish = false;
							var resultData = this.orderList.concat(result);
							this.orderList = resultData;
						}
				})
				
			},
			statusClick: function(status) {
				if (status == this.orderStatus) return;
				
				  this.orderList = [];
					this.orderStatus = status;
					this.page = 1;
					this.getOrderData();
			},
			goOrderDetails(id){
				uni.navigateTo({
					url:"./detail?id="+id
				})
			},
			cancelOrder(id,index){
				//删除订单
				deleteOrder({id:id}).then(result=>{
					uni.showToast({
						title: result,
						duration: 1500,
						icon: 'success'
					});
					this.orderList.splice(index,1);
				})
			},
			delOrder(id, index){
				
			},
			gotoMy(){
				uni.switchTab({
					url:"../my/my"
				})
			},
			goPay(id){
				//更新缓存记录来源
				uni.setStorageSync('jiesuanFromKey',"order|"+id);
				uni.navigateTo({
					url:"../jiesuan/jiesuan"
				})
			}
		},
		onReachBottom(){
			console.log("我已经滚动到底部了");
			if(!this.has_finish){
				this.page += 1;
				this.getOrderData();	
			}
				
		},
	}
</script>

<style>
	page{
		background: #f8f8f8;
	}
  .my-order .header {
  		height: 260rpx;
  		padding: 0 30rpx;
			background: #1db0fc;
  	}
  
  	.my-order .header .picTxt {
  		height: 190rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
  	}
  
  	.my-order .header .picTxt .text {
  		color: rgba(255, 255, 255, 0.8);
  		font-size: 26rpx;
  		font-family: 'Guildford Pro';
  	}
  
  	.my-order .header .picTxt .text .name {
  		font-size: 34rpx;
  		font-weight: bold;
  		color: #fff;
  		margin-bottom: 20rpx;
  	}
  
  	.my-order .header .picTxt .pictrue {
  		width: 122rpx;
  		height: 109rpx;
  	}
  
  	.my-order .header .picTxt .pictrue image {
  		width: 100%;
  		height: 100%;
  	}
  
  	.my-order .nav {
  		background-color: #fff;
  		width: 100%;
  		height: 140rpx;
  		border-radius: 6rpx;
  		margin: -73rpx auto 0 auto;
		display: flex;
		justify-content: space-around;
  	}
  
  	.my-order .nav .item {
  		text-align: center;
  		font-size: 26rpx;
  		color: #282828;
  		padding: 27rpx 0;
  		border-bottom: 5rpx solid transparent;
  	}
  
  	.my-order .nav .item.on {
  		/* #ifdef H5 || MP */
  		font-weight: bold;
  		/* #endif */
  		/* #ifdef APP-PLUS */
  		color: #000;
  		/* #endif */
  		border-color: #1db0fc;
  	}
  
  	.my-order .nav .item .num {
  		margin-top: 18rpx;
  	}
  
  	.my-order .list {
  		width: 100%;
  		margin: 14rpx auto 0 auto;
  	}
  
  	.my-order .list .item {
  		background-color: #fff;
  		border-radius: 6rpx;
  		margin-bottom: 14rpx;
  	}
  
  	.my-order .list .item .title {
  		height: 84rpx;
  		padding: 0 30rpx;
  		border-bottom: 1rpx solid #eee;
  		font-size: 28rpx;
  		color: #282828;
		display: flex;
		justify-content: space-between;
		align-items: center;
  	}
  .my-order .list .item .row-middle{
	  display: flex;
	  align-items: center;
		justify-content: flex-end;
  }
  	.my-order .list .item .title .sign {
  		font-size: 20rpx;
  		padding: 0rpx 10rpx;
  		height: 36rpx;
  		margin-right: 15rpx;
		
		background: rgb(247, 203, 210);
		color: rgb(235, 99, 106);
		border-radius: 4px;
  	}
  
  	.my-order .list .item .item-info {
  		padding: 0 24rpx;
  		margin-top: 22rpx;
		display: flex;
  	}
  
  	.my-order .list .item .item-info .pictrue {
  		width: 120rpx;
  		height: 120rpx;
		margin-right: 10rpx;
  	}
  
  	.my-order .list .item .item-info .pictrue image {
  		width: 100%;
  		height: 100%;
  		border-radius: 6rpx;
  	}
  
  	.my-order .list .item .item-info .text {
  		font-size: 28rpx;
  		color: #999;
  		margin-top: 6rpx;
  		display: flex;
		flex: 1;
  	}
  
  	.my-order .list .item .item-info .text .name {
  		width: 370rpx;
  		color: #282828;
  		height: 78rpx;
		font-size: 26rpx;
  	}
  
  	.my-order .list .item .item-info .text .money {
  		text-align: right;
  		flex: 1;
  	}
  
  	.my-order .list .item .totalPrice {
  		font-size: 26rpx;
  		color: #282828;
  		text-align: right;
  		margin-top: 16rpx;
  		padding: 0 30rpx 30rpx 0;
  		border-bottom: 1rpx solid #eee;
  	}
  
  	.my-order .list .item .totalPrice .money {
  		font-size: 28rpx;
  		font-weight: 400;
  		color: #e64340;
  	}
  
  	.my-order .list .item .bottom {
  		height: 107rpx;
  		padding: 0 30rpx;
  	}
  
  	.my-order .list .item .bottom .bnt {
  		width: 176rpx;
  		height: 60rpx;
  		text-align: center;
  		line-height: 60rpx;
  		color: #fff;
  		border-radius: 50rpx;
  		font-size: 27rpx;
			background:#1db0fc;
  	}
  
  	.my-order .list .item .bottom .bnt.cancelBnt {
  		border: 1rpx solid #ddd;
  		color: #aaa;
			background: #fff;
  	}
  
  	.my-order .list .item .bottom .bnt~.bnt {
  		margin-left: 17rpx;
  	}
  
  	.noCart {
  		margin-top: 171rpx;
  		padding-top: 0.1rpx;
  	}
  
  	.noCart .pictrue {
  		width: 414rpx;
  		height: 336rpx;
  		margin: 78rpx auto 56rpx auto;
  	}
  
  	.noCart .pictrue image {
  		width: 100%;
  		height: 100%;
  	}
  
  	.my-order .list .item .item-info .text .money .return {
  		margin-top: 10rpx;
  		font-size: 24rpx;
		color: rgb(235, 99, 106);
  	}
	.show_spec{
		font-size: 26rpx;
		color: #999;
	}
	.loadingicon{color: #666;text-align: center;margin-top: 12rpx;}
	.c_loading .iconfont{font-size: 50rpx;}
	.c_loadTitle{font-size: 24rpx;}
	.goback{position: fixed;right: 40rpx;bottom: 180rpx;background: #fff;border-radius: 48rpx;}
	.goback .icon-back{color: #1db0fc;font-size: 80rpx;}
</style>
