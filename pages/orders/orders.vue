<template>
	<view>
		<view class="order_nav">
				<view class="order_box">
						<view class="li active"><text class="tt">电费充值</text></view>
						<view class="li"></view>
						<view class="li">  </view>
				</view>
		</view>   
		<view style="height: 24rpx;background: #f8f8f8;"></view>
		
		<view class="show_order_box">
			<view style="height: 20rpx;"></view>
			<view class="order_list">
				<view class="order_no">
					<view class="img_box">
						<image src="../../static/zhanghu.png" mode=""></image><text class="order_num">订单编号：2022042344788</text>
					</view>
					<view class="pay_status">未支付</view>
				</view>
				<view class="detail">
					<view class="d_info">充值账户：<text class="right">54812121</text></view>
					<view class="d_info">充值金额：<text class="right">50.00元</text></view>
					<view class="d_info">实收金额：<text class="right">48.00元</text></view>
				</view>
				
				<view class="pay_btn_info">
					<view class="pay_btn">立即支付</view>
					<view class="pay_btn2" @click="gotoDetail(6)">查看详情</view>
				</view>
				<view class="bottom"></view>
			</view>
			
			<view class="order_list">
				<view class="order_no">
					<view class="img_box">
						<image src="../../static/zhanghu.png" mode=""></image><text class="order_num">订单编号：2022042344788</text>
					</view>
					<view class="pay_status">未支付</view>
				</view>
				<view class="detail">
					<view class="d_info">充值账户：<text class="right">54812121</text></view>
					<view class="d_info">充值金额：<text class="right">50.00元</text></view>
					<view class="d_info">实收金额：<text class="right">48.00元</text></view>
				</view>
				
				<view class="pay_btn_info">
					<view class="pay_btn2">查看详情</view>
				</view>
				<view class="bottom"></view>
			</view>
			
			<view class="order_list">
				<view class="order_no">
					<view class="img_box">
						<image src="../../static/zhanghu.png" mode=""></image><text class="order_num">订单编号：2022042344788</text>
					</view>
					<view class="pay_status">未支付</view>
				</view>
				<view class="detail">
					<view class="d_info">充值账户：<text class="right">54812121</text></view>
					<view class="d_info">充值金额：<text class="right">50.00元</text></view>
					<view class="d_info">实收金额：<text class="right">48.00元</text></view>
				</view>
				
				<view class="pay_btn_info">
					<view class="pay_btn2">查看详情</view>
				</view>
				<view class="bottom"></view>
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
			gotoDetail(id){
				uni.navigateTo({
					url:"../detail/detail?id="+id
				})
			}
		}
	}
</script>

<style>
  .order_nav{
        padding: 20rpx;
        height: 45rpx;
        line-height: 45rpx;
        font-size: 32rpx;
        color: #000;
    }
    .order_nav .order_box{
        width: 100%;
        display: flex;
    }
    .order_nav .order_box .li{
        width: 33%;
    }
		 .order_nav .order_box .li .tt{margin-left: 10rpx;}
		.order_nav .order_box .active{
				color:  #5b83ff;
				font-weight: bold;
		}
		/* 订单 */
		.show_order_box{margin-bottom: 50rpx;}
		.order_list{padding: 0rpx 20rpx 20rpx 20rpx;}
		.order_list .order_no{
			display: flex;
			align-items: center;
			height: 60rpx;
			line-height: 60rpx;
			justify-content: space-between;
		}
		.order_list .order_no .img_box{
			display: flex;
			align-items: center;
		}
		.order_list .order_no image{
			width: 48rpx;
			height: 48rpx;
			margin-right: 6rpx;
		}
		.order_list .order_no .order_num{
			font-weight: bold;
			color: #000000;
			font-size: 28rpx;
		}
		.order_list .order_no .pay_status{
			font-size: 28rpx;
			color: #4d4d4d;
		}
		.detail{margin-top: 10rpx;}
		.detail .d_info{
			font-size: 24rpx;
			color: #888888 ;
			line-height: 40rpx;
		}
		.detail .d_info .right{
			color: #1a1a1a;
		}
		.order_list .bottom{
			height: 6rpx;
			border-bottom: 2rpx solid #f4f4f4;
		}
		.pay_btn_info{
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
		}
		.pay_btn{
			width: 180rpx;
			height: 50rpx;
			float: left;
			background: #5b83ff;
			border-radius: 26rpx;
			line-height: 50rpx;
			text-align: center;
			font-size: 28rpx;
			color: #fff;
		}
		.pay_btn2{
			width: 180rpx;
			height: 50rpx;
			float: left;
			border: solid 2rpx #989898;
			border-radius: 26rpx;
			line-height: 50rpx;
			text-align: center;
			font-size: 28rpx;
			margin-left: 20rpx;
			color: #1a1a1a;
		}
</style>
