<template>
	<view>
		<view class="topnav">
			<view class="back_box"><view class="back"></view></view>
			<view class="title_name">
				<view>商品</view><view>详情</view>
			</view>
			<view></view>
		</view>
		<!-- 主图 -->
		<view class="product-main">
			<swiper :indicator-dots="true" :autoplay="true" indicator-active-color="#e93323"  class="pic_box">
				<swiper-item>
				　　<image src="https://data44.wuht.net//uploads/attach/2022/01/15/c815678a906c85ecd7f6535c8e5a29d3.jpg"></image>
				</swiper-item>
				<swiper-item>
				　　<image src="https://data44.wuht.net//uploads/attach/2022/01/15/4aed387bf4eead2237150c9d4b747ae5.jpg"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 商品信息 -->
		<view class="boxbox">
			<view class="goods_info">
				<view class="price_line">
					<view class="sale_price">
						<text>￥</text><text class="price">158.00</text>
					</view>
					<view class="huaxian_price">￥168.25</view>
					<view class="share">
						<image src="../../static/share.png"></image>
					</view>
				</view>
				<view class="goods_title">联想笔记本电脑 拯救者R9000P 16英寸高性能电竞游戏本(标压 8核 R7-5800H 16G 512G RTX3060 2.5k屏 165Hz)</view>
				<view class="goods_stock">
					<view>库存:900件</view>
					<view>已售:15件</view>
				</view>
				<!-- 优惠券 -->
				<view class="coupon_list">
					<view class="coupon_left">
						<view>优惠券：</view>
						<view class="one_coupon">满180减20</view>
					</view>
					<view class="coupon_right">
						<view class="more"></view>
					</view>
				</view>
			</view>
			
			<!-- 参数 -->
			<view class="goods_params">
				<view class="tit">参数</view>
				<view class="line_info"><text class="key">品牌/产地</text><text class="value">意大利</text></view>
				<view class="line_info"><text class="key">酒精度</text><text class="value">40%wao</text></view>
				<view class="line_info"><text class="key">容量</text><text class="value">700ML</text></view>
			</view>
			
			<!-- 详情 -->
			<view class="goods_desc">
				<view class="tit">商品介绍</view>
				<image src="https://data44.wuht.net//uploads/attach/2022/01/15/d1742d71ce3d2762c05bc009fe962424.jpg" mode="widthFix"></image>
			</view>
			
			<view style="height: 40rpx;"></view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				id:0
			}
		},
		onLoad(option) {
			this.id = option.id;
		},
		methods: {
			
		}
	}
</script>
<style>
	page{
		background: #f8f8f8;
	}
.topnav{
	position: fixed;
	background-color: #fff;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 74rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #333;
	font-size: 32rpx;
	font-weight: 500;
	border-bottom: 2rpx solid #f3f3f3;
}
.topnav .title_name{
	display: flex;
	justify-content: space-around;
}
.topnav .back_box{
	color: #333;
	width: 46rpx;
	height: 46rpx;
	border: 2rpx solid rgba(0,0,0,0.1);
	border-radius: 50%;
	margin-left: 24rpx;
	text-align: ;
}
.topnav .back{
	width: 46rpx;
	height: 46rpx;
	 display: flex;
	align-items: center;
}
.topnav .back:before {
		content: " ";
    display: inline-block;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    height: 18rpx;
   	width: 18rpx;
    border-width: 0 0 4rpx 4rpx;
    border-color: #000;
    border-style: solid;
		margin-left: 18rpx;
  
}
.topnav .title_name view{
	padding: 0rpx 16rpx;
}
.product-main {
		width: 100%;
		height: 750rpx;
		margin-top: 74rpx;
	}

.product-main .pic_box {
	width: 100%;
	height: 100%;
}
.product-main .pic_box image{
	width: 100%;
	height: 100%;
}

.boxbox{
	padding: 0rpx 12rpx;
	margin-top: 12rpx;
}
.goods_info{
	overflow: hidden;
	background: #fff;
	border-radius: 10rpx;
	
}
.price_line{
	display: flex;
	padding: 20rpx 20rpx 14rpx 20rpx;
	align-items: center;
}
.price_line .sale_price{
	color: #f94a3b;
	font-size: 24rpx;
	font-weight: 600;
	margin-right: 24rpx;
}
.price_line .sale_price .price{
	font-size: 38rpx;
}
.price_line .huaxian_price{
	color: #666;
	font-size: 24rpx;
	text-decoration: line-through;
}
.price_line .share{
	flex: 1;
	text-align: right;
}
.price_line .share image{
	width: 40rpx;
	height: 40rpx;
	float: right;
}
.goods_title{
	margin-top: 10rpx;
	font-size: 28rpx;
	padding: 0 20rpx;
}
.goods_stock{
	display: flex;
	padding: 12rpx 20rpx;
}
.goods_stock view{
	width: 40%;
	font-size: 24rpx;
	color: #82848f;
}
.coupon_list{
	padding: 0 20rpx;
	border-top: 2rpx solid #f3f3f3;
	height: 90rpx;
	font-size: 28rpx;
	color: #82848f;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.coupon_list .coupon_left{
	display: flex;
	align-items: center;
}
.coupon_list .coupon_right{
	
}
.coupon_list .coupon_right .more{
	padding: 0rpx 14rpx;
	color: #82848f;
	border-radius: 24rpx;
	 display: flex;
	align-items: center;
	font-size: 20rpx;
}
.coupon_list .coupon_right .more:after {
  content: '';
	height: 20rpx;
	width: 20rpx;
	border-top: 2rpx solid #82848f;
	border-right: 2rpx solid #82848f;
	transform: rotate(45deg);
}
.one_coupon{
	    height: 44rpx;
	    padding: 0 20rpx;
	    border: 1rpx solid #ff6151;
	    color: #e93323;
	    font-size: 24rpx;
	    line-height: 44rpx;
	    position: relative;
	    margin: 20px 0 20px 16px;
			text-align: center;
}
.one_coupon::before{
	content: ' ';
	position: absolute;
	width: 6rpx;
	height: 10rpx;
	border-radius: 0 6rpx 6rpx 0;
	border: 1rpx solid #ff6151;
	background-color: #fff;
	bottom: 50%;
	left: -2rpx;
	margin-bottom: -6rpx;
	border-left-color: #fff;
}
.one_coupon:after {
    content: ' ';
    position: absolute;
    width: 6rpx;
    height: 10rpx;
    border-radius: 6rpx 0 0 6rpx;
    border: 1rpx solid #ff6151;
    background-color: #fff;
    right: -2rpx;
    bottom: 50%;
    margin-bottom: -6rpx;
    border-right-color: #fff;
}
.goods_params{
	overflow: hidden;
	background: #fff;
	border-radius: 10rpx;
	margin-top: 16rpx;
	padding: 16rpx 16rpx 10rpx 16rpx;
	font-size: 24rpx;
	color: #82848f;
}
.goods_params .tit{
	font-size: 28rpx;
	font-weight: 500;
	margin-bottom: 8rpx;
	color: #000000;
}
.goods_params .line_info{
	border-bottom: 2rpx solid #f3f3f3;
	height: 58rpx;
	line-height: 58rpx;
}
.goods_params .line_info .key{
	width: 160rpx;
	display: inline-block;
}
.goods_params .line_info .value{
	color: #000000;
}
.goods_params .line_info:last-child{
	border-bottom: none;
}
/* 详情 */
.goods_desc{
	overflow: hidden;
	background: #fff;
	border-radius: 10rpx;
	margin-top: 16rpx;
	
	font-size: 24rpx;
	color: #82848f;
	margin-bottom: 40rpx;
}
.goods_desc .tit{
	padding: 16rpx 16rpx 10rpx 16rpx;
	font-size: 28rpx;
	font-weight: 500;
	margin-bottom: 8rpx;
	text-align: center;
	color: #000000;
}
.goods_desc image{
	width: 100%;
	/* height: auto; */
}
</style>
