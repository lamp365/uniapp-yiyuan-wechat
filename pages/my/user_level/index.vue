<template>
	<view>
		<view class="top-bj">
			<view class="chengzhang_box">
				<view class="chengzhang">
					<view class="tit">
						我的成长特权
					</view>
					<view class="tequan">
						<view class="">
							<image src="../../../static/level_icon1.png" mode=""></image>
							<view class="">
								享受折扣
							</view>	
						</view>
						
						<view class="">
							<image src="../../../static/level_icon2.png" mode=""></image>
							<view class="">
								专属徽章
							</view>	
						</view>
						
						<view class="">
							<image src="../../../static/level_icon3.png" mode=""></image>
							<view class="">
								积分累积
							</view>	
						</view>
						
						<view class="">
							<image src="../../../static/level_icon4.png" mode=""></image>
							<view class="">
								尊享客服
							</view>	
						</view>
					</view>	
				</view>
			</view>
		</view>
		<view style="height: 74rpx;"></view>	
		<view class="htitle">
			快速升级技巧
		</view>
		<view class="section-bd">
			<view class="item">
				<view class="left">
					<view class="ttt">
						购买商品 <text class="tip">+{{jifen}}个积分/元</text>
					</view>
					<view class="info">
						购买商品可获得对应不等的积分
					</view>
				</view>
				<view class="right" @click="gotoBuy()">
					去购买
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<view class="ttt">
						邀请好友 <text class="tip">+{{yaoqin_jifen}}个积分/人</text>
					</view>
					<view class="info">
						邀请好友注册应用可获得积分
					</view>
				</view>
				<view class="right">
					去邀请
				</view>
			</view>
			
			
		</view>
		<!-- 热门推荐 -->
		<view class="ruijian_box">
			<view class="tit">
				为您推荐
			</view>
			<view class="list">
				<view v-for="(item,index) in product" :class="index % 2 ? 'itemr':'iteml'" @click="gotoProduct(item.id)" :key="index">
					<view class="pic">
						<image :src="item.main_img_url" mode=""></image>
					</view>
					
					<view class="title">{{item.name}}</view>
					<view class="price" v-if="item.type==0">￥{{item.sale_price}}</view>
						<view class="price" v-else>￥{{item.active_price}}</view>
				</view>
				
				
				<view class="no_data"  v-if="product.length ==0" style="">
					<view style="justify-content: center;display: flex;">
						 <image src="../../../static/no_data.png" style="margin-top: 100rpx;width: 280rpx;height: 280rpx;"></image>
					</view>
								
					 <view style="height: 48rpx;"></view>
				</view>
				
			</view>
		</view>
		
		<view class="goback"><text class="iconfont icon-back" @click="gotoMy()"></text></view>
	</view>
</template>

<script>
	import {getTuijianProduct} from "../../api/productApi.js";
	export default {
		data() {
			return {
				product:[],
				jifen:'',
				yaoqin_jifen:''
			}
		},
		onLoad() {
			this.getTuijianProductFunc();
			var sysInfo  = uni.getStorageSync('sysInfo');
			this.jifen = sysInfo.order_jifen;
			this.yaoqin_jifen = sysInfo.invite_jifen;
		},
		methods: {
			getTuijianProductFunc(){
				getTuijianProduct().then(result=>{
					this.product = result;
				})
			},
			gotoProduct(id){
				uni.navigateTo({
					url:"../../product/product?id="+id
				})
			},
			gotoMy(){
				uni.switchTab({
					url:"../../my/my"
				})
			},
			gotoBuy(){
				uni.navigateTo({
					url:"../../search/search"
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f8f8f8;
	}
.top-bj{
	background-color: #333;
	height: 230rpx;
	position: relative;
	width: 100%;
}
.chengzhang_box{
	position: absolute;
	width: 100%;
	top: 30rpx;
	left: 0;
	z-index: 666;
	
}
.chengzhang{
	border-radius: 10rpx;
	margin: 0rpx 32rpx 0rpx;
	background-color: #fff;
	box-shadow: 0 4rpx 16rpx 0 hsl(0deg 0% 92% / 50%);
}
.chengzhang .tit{
	padding: 26rpx 26rpx 0;
	font-weight: 700;
	font-size: 34rpx;
	color: #282828;
}
.chengzhang .tequan{
	display: flex;
	justify-content: space-between;
	font-size: 28rpx;
	padding: 30rpx;
}
.chengzhang .tequan image{
	width: 96rpx;
	height: 96rpx;
	border-radius: 50%;
}
.htitle{
	padding-top: 40rpx;
	padding-bottom: 38rpx;
	padding-left: 56rpx;
	font-weight: 700;
	font-size: 32rpx;
	color: #282828;
}
.section-bd{
	padding: 0 30rpx;
}
.section-bd .item {
    height: 148rpx;
    padding-right: 26rpx;
    padding-left: 26rpx;
    border-radius: 4rpx;
    background-color: #fff;
    box-shadow: 0 4rpx 10rpx 0 hsl(0deg 0% 92% / 50%);
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}
.section-bd .item .left{
	flex: 1;
}
.section-bd .left .ttt{
	padding-left: 20rpx;
	border-left: 4rpx solid #e8b869;
	font-weight: 700;
	font-size: 32rpx;
	line-height: 1.1;
	color: #282828;
}
.section-bd .left .tip{
	font-weight: 400;
	font-size: 24rpx;
	color: #c6985c;
	margin-left: 24rpx;
}
.info{
	padding-left: 20rpx;
	margin-top: 18rpx;
	font-size: 22rpx;
	color: #999;
}
.right{
	width: 150rpx;
	height: 54rpx;
	border-radius: 26rpx;
	background: linear-gradient(-90deg,#e7b667,#ffeab5);
	font-size: 26rpx;
	line-height: 52rpx;
	text-align: center;
	color: #8a5f1e;
}
.ruijian_box{
	padding: 0 30rpx;
	background-color: #fff;
	overflow: hidden;
	min-height: 800rpx;
	margin-top: 30rpx;
}
.ruijian_box .tit{
	font-weight: 700;
	font-size: 30rpx;
	text-align: center;
	line-height: 120rpx;
	color: #333;
}

.ruijian_box .iteml{
	width: 49%;
	margin-bottom: 32rpx;
	border-radius: 20rpx 20rpx 0 0;
	box-shadow: 0rpx 2rpx 10rpx 2rpx rgb(0 0 0 / 3%);
	float: left;
}
.ruijian_box .itemr{
	width: 49%;
	margin-bottom: 32rpx;
	border-radius: 20rpx 20rpx 0 0;
	box-shadow: 0rpx 2rpx 10rpx 2rpx rgb(0 0 0 / 3%);
	float: right;
}
.ruijian_box .pic{
	display: flex;
	justify-content: center;
}
.ruijian_box  image{
	width: 98%;
	height: 350rpx;
	margin: 6rpx auto 0rpx auto;
}
.ruijian_box .title{
	    font-size: 28rpx;
	    color: #282828;
	    margin-top: 12rpx;
	    padding: 0 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
}
.ruijian_box  .price{
	font-size: 24rpx;
	margin-top: 8rpx;
	padding: 0 10rpx 10rpx 10rpx;
	color: #fd502f;
}
	.goback{position: fixed;right: 40rpx;bottom: 74rpx;background: #fff;border-radius: 48rpx;}
	.goback .icon-back{color: #e7b667;font-size: 80rpx;}
</style>
