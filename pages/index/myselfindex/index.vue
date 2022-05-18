<template>
	<view>
		<view class="header">
			<view class="serch-wrapper">
				<view class="logo">整件酒 
					<view class="tit_info">优质精选好物</view>
				</view>
				<view class="input">
					<image src="../../../static/search.png"></image>
					搜索商品
				</view>
			</view>
		</view>
		<view class="swiperBg">
			<view class="bag"></view>
			<view class="swiper">
				<swiper :indicator-dots="true" :autoplay="true"   class="box">
					<swiper-item v-for="(item,index) in topBanner" :key="index">
					　　<image :src="item.image" mode="" class="banner"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	
export default {
	data(){
		return{
			topBanner:[
				{'image':'https://data44.wuht.net//uploads/attach/2022/01/20220115/84578abf1060697da0529a5ccc50934c.png'},
				{'image':'https://data44.wuht.net//uploads/attach/2022/01/20220115/d54f87813d22fc2ce2e6e231f3bcfae7.png'}
			]
		}
	},
	onLoad(){
		
	},
	onShow() {
	    
	},
	methods: {
		
	}
}
</script>

<style lang="scss">
.header{
		width: 100%;
		height: 162rpx;
		background: #fff;
		background: linear-gradient(to right, #ff6151, #e93323);
}
.header .serch-wrapper{
    padding: 22rpx 32rpx 0 32rpx;
}
.header .serch-wrapper .logo{
    margin-right: 36px;
    display: flex;
    align-items: flex-end;
		color: #fff;
}
.header .serch-wrapper .logo .tit_info{
    color: #fff;
    font-size: 26rpx;
    margin-left: 22rpx;
    margin-bottom: -2rpx;
}
.header .serch-wrapper .logo image{
    height: 54rpx;
}
.header .serch-wrapper .input{
    display: flex;
    height: 66rpx;
    padding: 0 0 0 32rpx;
    background: #f7f7f7;
    border: 2rpx solid #f1f1f1;
    color: #999;
    font-size: 28rpx;
    flex: 1;
    z-index: 99;
    margin: 14rpx 0;
		border-radius: 44rpx;
		align-items: center;;
}
.header .serch-wrapper .input image{
	height: 34rpx;
	width: 34rpx;
	margin-right: 16rpx;
}
// 中间轮播
.swiperBg{
    background-color: #fff;
    position: relative;
    border-top: 1rpx solid #f18175;
		height: 312rpx;
}
.swiperBg .bag{
	    width: 100%;
	    height: 150rpx;
	    background: linear-gradient(to right, #ff6151, #e93323);
	    border-bottom-left-radius: 22px;
	    border-bottom-right-radius: 22px;
}
.swiperBg .swiper {
    z-index: 600;
    position: absolute;
		top: 0;
    height: 306rpx;
    padding: 0 32rpx;
    overflow: hidden;
}
.swiperBg .swiper .box,.swiperBg .swiper image{
	width: 100%;
	height: 306rpx;
}
</style>
