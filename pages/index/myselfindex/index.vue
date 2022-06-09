<template>
	<view>
		<view class="header">
			<view class="serch-wrapper">
				<view class="logo">整件酒 
					<view class="tit_info">优质精选好物</view>
				</view>
				<view class="input">
					<image src="../../../static/search.png"></image>
					请输入搜索名称
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
		
		
		<!-- 新人福利专区 -->
		<view class="newfuli" v-if="newProduct.length > 0">
			<view class="main">
				<view class="tit_line">
					<view class="tit">新人福利专区</view>
					<view class="more">更多</view>
				</view>
				<view class="good_list">
					 <scroll-view scroll-x  scroll-left="scrollleft" class="box_scroll_view">
						 <view class="the_item" v-for="(item,index) in newProduct" :key="index" @click.native="getoProduct(item.id)">
							 <image :src="item.main_img_url" mode="aspectFill"></image>
							 <view class="price_line">
									<view class="active_price">¥{{item.active_price}}</view>
									<view class="price">¥{{item.sale_price}}</view>
							 </view>
						 </view>
						
					 </scroll-view>
				</view>	
			</view>
		</view>
		
		<!-- nav log -->
		<view class="nav_box">
			<view class="nav_line">
				<view class="nav_one_info">
					<view class="logo">
						<image src="../../../static/category.png"></image>
						<view class="menu-txt">商品分类</view>
					</view>
				</view>
				<view class="nav_one_info">
					<view class="logo">
						<image src="../../../static/youhuijuan.png"></image>
						<view class="menu-txt">领优惠券</view>
					</view>
				</view>
				<view class="nav_one_info">
					<view class="logo">
						<image src="../../../static/zixun.png"></image>
						<view class="menu-txt">资讯公告</view>
					</view>
				</view>
				<view class="nav_one_info">
					<view class="logo">
						<image src="../../../static/address_logo.png"></image>
						<view class="menu-txt">地址管理</view>
					</view>
				</view>
			</view>
			<view class="nav_line">
				<view class="nav_one_info">
					<view class="logo">
						<image src="../../../static/canjia.png"></image>
						<view class="menu-txt">砍价活动</view>
					</view>
				</view>
				<view class="nav_one_info">
					<view class="logo">
						<image src="../../../static/pintuan.png"></image>
						<view class="menu-txt">拼团活动</view>
					</view>
				</view>
				<view class="nav_one_info">
					<view class="logo">
						<image src="../../../static/youjiang.png"></image>
						<view class="menu-txt">邀请有奖</view>
					</view>
				</view>
				<view class="nav_one_info">
					<view class="logo">
						<image src="../../../static/collect.png"></image>
						<view class="menu-txt">我的收藏</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 特别区域 -->
		<view class="specialArea">
			<view class="new_libao">
				<view class="" style="margin-top: 12rpx;">
					<view class="tit1">新用户首单福利专区</view>
					<view class="tit2">全场享惊喜折扣</view>
					<view class="lijigou">
						立即购
					</view>
				</view>	
				<view class="right_icon">
					<image src="../../../static/lihe_icon.png" mode="heightFix"></image>
				</view>
			</view>
			<view class="huodong_list">
				<view class="pingtuan">
					<image src="../../../static/pingtuan_pic.jpg" mode="widthFix"></image>
				</view>	
				<view class="kangjia">
					<image src="../../../static/kangjia_pic.jpg" mode="widthFix"></image>
				</view>	
			</view>
		</view>
		
		
		<view class="bbox_bg">
			<!-- 优惠券 -->
			<view class="coupon_main" v-if="allCoupon.length>0">
				<view class="title">
					<view class="tit1">
						<view class="name1">
							优惠券
						</view>
						<view class="name2">
							领取今日好劵
						</view>
					</view>
					<view class="more">
						更多
					</view>
				</view>
				<scroll-view scroll-x  scroll-left="scrollleft" class="coupon_scroll_view">
					 <view class="coupon_item" v-for="(item,index) in allCoupon" :key="index" >
						<view class="coupon_box" @click="lingquQuan(item.id,index)">
						 	<view class="price_info">
								<view class="">
									¥<text class="money">{{parseFloat(item.money).toFixed(2)}}</text>
								</view>	
								<view class="tijian">
									满{{item.tiaojian}}元可用
								</view>
							</view>
							<view class="lingqu" v-if="item.has_get==0">
								<view>领</view><view>取</view>
							</view>
							<view class="lingqu" v-if="item.has_get==1">
								<view>已</view><view>领</view>
							</view>
						</view>
						
					 </view>
					
				</scroll-view>
			</view>


			<!-- 好货推荐 -->
			<view class="haohuo_title">
				好货推荐
			</view>
			<view class="haohuo_box">
				
				<view class="one_list" v-for="(item,index) in randProduct" @click="getoProduct(item.id)" :key="index">
					<view class="pic_view">
						<view class="mian_img">
							<image :src="item.main_img_url" mode="widthFix"></image>
						</view>
					</view>
					<view class="tit">
						{{item.name}}
					</view>
					<view class="price_info">
						<view class="">
							<view class="money1" v-if="item.type==0">
								¥<text class="sale_price">{{item.sale_price}}</text>
							</view>
							<view class="money1" v-if="item.type>0">
								¥<text class="sale_price">{{item.active_price}}</text>	<text class="icon">{{item.type_str}}</text>
							</view>
							<view class="money2" v-if="item.type>0">
								¥{{item.sale_price}}
							</view>
						</view>
						<view class="jiagou">
							<image src="../../../static/add.png" mode=""></image>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="dixian">---- 人家也是有底线得 ----</view>
	</view>
</template>

<script>
import {getShopInfo,getTopBanner} from "../../api/indexApi.js";
import {getRandProduct,getNewProduct} from "../../api/productApi.js";
import {getAllCoupon,lingQuan} from "../../api/couponApi.js";
export default {
	data(){
		return{
			sysInfo:{},
			topBanner:[
				{'image':'https://data44.wuht.net//uploads/attach/2022/01/20220115/84578abf1060697da0529a5ccc50934c.png'},
				{'image':'https://data44.wuht.net//uploads/attach/2022/01/20220115/d54f87813d22fc2ce2e6e231f3bcfae7.png'}
			],
			page:1,
			randProduct:[],
			newProduct:[],
			allCoupon:[]
		}
	},
	mounted(){
		this.getShopInfoInit();
		this.getRandProductFunc();
		this.getNewProductFunc();
		this.getAllCouponFunc();
	},
	onShow() {
		console.log(2222);
	    /* getTopBanner().then(result=>{
	    	this.topBanner = result;
	    }); */
	   
	},
	methods: {
		getShopInfoInit(){
			var cacheData = uni.getStorageSync('sysInfo');
			if(!cacheData){
				getShopInfo().then(result=>{
					var cacheTime = Date.now();
					result.cacheTime = cacheTime;
					this.sysInfo = result;
					uni.setNavigationBarTitle({
						title:result.shop_name
					})
					uni.setStorageSync('sysInfo',result)
				});
			}else{
				const oldTime = cacheData.cacheTime;
				const currentTime = Date.now();
				const overTime = (currentTime - oldTime)/1000;
				var condition = 60*60*24;
				this.sysInfo = cacheData;
				uni.setNavigationBarTitle({
					title:cacheData.shop_name
				})
				if(overTime > condition){
					//清空下次 重新请求
					uni.setStorageSync('sysInfo','')
				}
				
			}
		},
		getRandProductFunc(){
			getRandProduct().then(result=>{
				this.randProduct = result;
			})
		},
		getNewProductFunc(){
			getNewProduct({limit:8}).then(result=>{
				this.newProduct = result;
			})
		},
		getAllCouponFunc(){
			getAllCoupon().then(result=>{
				this.allCoupon = result;
			})
		},
		getoProduct(id){
			uni.navigateTo({
				url:"/pages/product/product?id="+id
			})
		},
		lingquQuan(id,index){
			if(this.allCoupon[index].has_get == 1){
				uni.showToast({
					title: "您已领取过了",
					duration: 2000,
					icon: 'error'
				})
				return '';
			}
			lingQuan({id:id}).then(result=>{
				uni.showToast({
					title: '领取完毕',
					duration: 1500,
					icon: 'success'
				})
				this.allCoupon[index].has_get = 1;
			})
		}
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
			position: absolute;
			z-index: 200;
}
.swiperBg .swiper {
    z-index: 600;
    position: relative;
		top: 2rpx;
    height: 306rpx;
    padding: 0 30rpx;
    overflow: hidden;
}
.swiperBg .swiper .box,.swiperBg .swiper image{
	width: 100%;
	height: 306rpx;
	border-radius: 20rpx;
}
// 新人福利
.newfuli{
	padding: 0 30rpx;

}
.newfuli .main{
	background:  linear-gradient(to right, #ff6151, #e93323);
	margin-top: 16rpx;
	overflow: hidden;
	border-radius: 10rpx;
}
.newfuli .main .tit_line{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 14rpx 20rpx;
}
.newfuli .main .tit{
	font-size: 24rpx;
	font-weight: 700;
	color: #FFF8C6;
}
.newfuli .main .more{
	padding: 0rpx 14rpx;
	background: #FFF8C6;
	color: #e93323;
	border-radius: 24rpx;
	 display: flex;
	align-items: center;
	font-size: 20rpx;
}
.newfuli .main .more:after {
    content: '';
	// position: absolute;
	/* top: 0rpx; */
	// right: 60rpx;
	height: 14rpx;
	width: 14rpx;
	border-top: 2rpx solid #e93323;
	border-right: 2rpx solid #e93323;
	transform: rotate(45deg);
}
.newfuli .main .good_list{
	display: flex;
	justify-content: space-between;
	padding: 18rpx 20rpx;
	overflow: hidden;
}
.newfuli .box_scroll_view {
    white-space: nowrap;
	width: 100%;
	display: flex;
	flex-direction: row;
	height: 258rpx;
}
.newfuli .the_item {
    width: 220rpx;
	height: 258rpx;
	display: inline-block;
	margin-right: 16rpx;
	box-sizing: border-box;
	overflow: hidden;
	background: #fff;
	border-radius: 14rpx;
	
}
.newfuli .the_item image {
    width: 100%;
    height: 200rpx;
	border-top-left-radius: 14rpx;
	border-top-right-radius: 14rpx;
}
.newfuli .the_item .price_line{
	width: 90%;
	height: 30rpx;
	background: #e6e6e6;
	margin-left: 5%;
	border-radius: 16rpx;
	font-size: 20rpx;
	margin-top: 6rpx;
}
.newfuli .the_item .price_line .active_price{
	float: left;
	width: 45%;
	background: #e93323;
	text-align: center;
	color: #fff;
	border-radius: 16rpx;

}
.newfuli .the_item .price_line .price{
	float: right;
	text-align: center;
	width: 55%;
	color: #999;
    text-decoration: line-through;

}
// 图标logo
.nav_box{
	padding: 0 30rpx;
	height: 316rpx;
}
.nav_box .nav_line{
	display: flex;
	justify-content: space-between;
	height: 158rpx;
}
.nav_one_info{
	margin-top: 16rpx;
	width: 25%;
	text-align: center;
	font-size: 12px;
}
.nav_one_info .logo{
	width: 100rpx;
	height: 100rpx;
	margin: 0 auto;
}
.nav_one_info .logo image{
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.nav_one_info .menu-txt{
	font-size: 24rpx;
}
// 活动icon
.specialArea{
	margin-top: 25rpx;
	padding: 0 30rpx;	
	background:  linear-gradient(to bottom, #fff, #f5f5f5);
}
.specialArea .new_libao{
	background:  linear-gradient(to right, #ffe7ea, #f7d7db);
	height: 160;
	display: flex;
	justify-content: space-between;
	padding: 0rpx 20rpx;
	border-radius: 20rpx;
	color: #f94a3b;
}
.specialArea .new_libao .tit1{
	font-size: 32rpx;
	font-weight: bold;
}
.specialArea .new_libao .tit2{
	font-size: 28rpx;
	font-weight: bold;
}
.specialArea .new_libao .lijigou{
	margin-top: 10rpx;
	padding: 0 14rpx;
	color: #fff;
	font-size: 24rpx;
	background: #f94a3b;
	display: inline-block;
	border-radius: 16rpx;
	margin-bottom: 22rpx;
}
.specialArea .new_libao .right_icon{
	height: 160rpx;
}
.specialArea .new_libao image{
	height: 160rpx;
}

.specialArea .huodong_list{
	display: flex;
	justify-content: space-between;
	padding: 16rpx 0rpx;
}
.specialArea .huodong_list .pingtuan,.specialArea .huodong_list .kangjia{
	width: 49%;
}
.specialArea .huodong_list image{
	width: 100%;
}
// 优惠券
.bbox_bg{
	background: #f5f5f5;
	padding: 0rpx 30rpx;
	overflow: hidden;
}
.coupon_main{
	background: #fff;
	overflow: hidden;
	border-radius: 12rpx;
	padding: 20rpx;
}
.coupon_main .title{
	padding-top: 0 20rpx;
	display: flex;
	justify-content: space-between;
	font-size: 24rpx;
	color: #999;
	align-items: center;
}
.coupon_main .title .tit1{
    display: flex;
    align-items: flex-end;
}
 .coupon_main .title  .more{
	 display: flex;
	align-items: center;
}
 .coupon_main .title  .more:after {
    content: '';
	// position: absolute;
	/* top: 0rpx; */
	// right: 60rpx;
	height: 14rpx;
	width: 14rpx;
	border-top: 2rpx solid #999;
	border-right: 2rpx solid #999;
	transform: rotate(45deg);
}
.coupon_main .title .tit1 .name1{
	color: #282828;
	font-size: 36rpx;
	font-weight: 700;
}
.coupon_main .title .tit1 .name2 {
    margin-left: 12rpx;
}
.coupon_scroll_view{
	margin-top: 20rpx;
	white-space: nowrap;
	width: 100%;
	display: flex;
	flex-direction: row;
	height: 120rpx;
}
.coupon_scroll_view .coupon_item {
    width: 240rpx;
    height: 118rpx;
    display: inline-block;
    margin-right: 20rpx;
    box-sizing: border-box;
    overflow: hidden;
    background: url("@/static/youhuijuan_pic.png") no-repeat;
	background-size: 100%;
    border-radius: 14rpx;
	color: #fff;
}
.coupon_scroll_view .coupon_item .coupon_box{
	display: flex;
	justify-content: space-between;
}
.coupon_scroll_view .coupon_item .price_info{
	font-size: 30rpx;
	margin-top: 26rpx;
	margin-left: 20rpx;
}
.coupon_scroll_view .coupon_item .price_info .money{
	font-size: 36rpx;
	font-weight: 600;
}
.coupon_scroll_view .coupon_item .tijian{
	font-size: 22rpx;
}
.coupon_scroll_view .coupon_item .lingqu{
	font-size: 22rpx;
	margin-top: 26rpx;
	margin-right: 16rpx;
	font-weight: 600;
}
// 好货推荐
.haohuo_title{
	margin-top: 20rpx;
	color: #282828;
	font-size: 36rpx;
	font-weight: 700;
}
.haohuo_box{
	margin-bottom: 40rpx;
	margin-top: 24rpx;
}
.haohuo_box .one_list {
    width: 49%;
    background-color: #ffffff;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    padding-bottom: 18rpx;
}
.haohuo_box .one_list:nth-of-type(odd) {
    float: left;
}
.haohuo_box .one_list:nth-of-type(even) {
    float: right;
}
.haohuo_box .one_list .pic_view {
    width: 100%;
}
.haohuo_box .one_list .pic_view .mian_img {
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
}
.haohuo_box .one_list .pic_view image {
    width: 100%;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
}
.haohuo_box .one_list .tit {
    color: #252525;
    font-size: 28rpx;
    padding: 0rpx 16rpx;
    overflow: hidden;
}
.haohuo_box .one_list .price_info {
    padding: 0rpx 16rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
	font-size: 26rpx;
	align-items: center;
}
.haohuo_box .one_list .jiagou{
	width: 40rpx;
	height: 40rpx;
}
.haohuo_box .one_list .jiagou image{
	width: 40rpx;
	height: 40rpx;
}
.haohuo_box .one_list .money1{
	color: #f94a3b;
}
.haohuo_box .one_list .money2{
	color: #999;
	text-decoration: line-through;
}
.haohuo_box .one_list .price_info .sale_price{
	font-size: 32rpx;
}
.haohuo_box .one_list .price_info .icon{
	margin-left: 8rpx;
	padding: 0 8rpx;
	font-size: 18rpx;
	background: #f94a3b;
	color: #fff;
	border-radius: 8px;
}
	.dixian{
		background:  #f5f5f5;
		color: #888;
		font-size: 24rpx;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
		padding-bottom: 16rpx;
	}
</style>
