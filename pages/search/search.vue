<template>
	<view>
		<view class="main_search">
			<view class="put">
				<uni-search-bar radius="16" placeholder="请输入搜索名称" v-model="searchValue" :value="searchValue" clearButton="none" cancelButton="none"
			@confirm="" @blur="sureSearch"/>
			</view>
			<view class="s_btn">
				确定
			</view>
			
		</view>
	
	
	  <view class="seek-re">
	    <view>搜索历史</view>
	    <view class="seek-re-list">
	      <view v-for="(item,key) in searchDataList" :key="key" @click="clickHistory(item)" >{{item}}</view>
	    </view>
	  </view>
	  
	  
	  <view class="haohuo_box">
	  	
	  	<view class="one_list" v-for="(item,index) in productData" @click="getoProduct(item.id)" :key="index">
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
	  				<image src="../../static/add.png" mode=""></image>
	  			</view>
	  		</view>
	  	</view>
	  	
	  </view>
	  
	  <view class="dixian">---- {{copyright}} ----</view>
	  
		<!-- 弹窗end -->
		<fullLoading :loadModal="loadModal"></fullLoading>
	</view>
</template>

<script>
	import fullLoading from "../../components/loading/fullLoading.vue";
	import {getRandProduct,getSearchProduct} from "../api/productApi.js";
	import { shareMixins} from '@/mixins/share';
	export default {
		mixins: [shareMixins],
		components:{
			fullLoading
		},
		data() {
			return {
				searchValue:'',
				productData:[],
				searchDataList:[],
				loadModal:false,
				copyright:'祝您早日康复!'
			}
		},
		onShow() {
			this.getRandProductFunc();
			this.searchDataList = uni.getStorageSync('search_history');
			
			var cacheData = uni.getStorageSync('sysInfo');
			this.copyright = cacheData.copyright;
		},
		methods: {
			sureSearch(){
				console.log(this.searchValue);
				if(this.searchValue == ''){
					return false;
				}
				this.loadModal = true;
				getSearchProduct({title:this.searchValue}).then(result=>{
					this.loadModal = false;
					this.productData = result;
				}).catch(error=>{
					this.loadModal = false;
					this.productData = [];
				})
				//记录历史
				this.setSearchHistory();
			},
			getRandProductFunc(){
				getRandProduct().then(result=>{
					this.productData = result;
				})
			},
			clickHistory(val){
				this.searchValue = val;
				this.sureSearch();
			},
			setSearchHistory() {
				if(this.searchValue == ''){
					return false;
				}
				var search = this.searchValue;
				var searchDataList = uni.getStorageSync('search_history');
				if(searchDataList == '' || searchDataList==null || searchDataList==undefined){
					var history = [];
					history.unshift(search);
				}else{
					searchDataList.forEach(item=>{
						if(item == search){
							let posNum = searchDataList.indexOf(item);
							searchDataList.splice(posNum,1);
						}
					});
					searchDataList.unshift(search);
					var history = searchDataList;
				}
				
				history = history.slice(0,8);//截取10个
				this.searchDataList = history;
				uni.setStorageSync(
					'search_history',history
				);
			},
			getoProduct(id){
				uni.navigateTo({
					url:"../product/product?id="+id
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f8f8f8;
	}
.main_search{
	border-bottom: 1px solid #eee;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 899;
}
.main_search .put{
	flex: 1;
}
.main_search .s_btn{
	font-size: 28rpx;
	color: #333;
	width: 60rpx;
	padding-right: 26rpx;
	text-align: center;
}
.seek-re{
	margin-top: 118rpx;
	height: auto;
	padding: 22rpx 24rpx 30rpx 24rpx;
	background: #fff;
	border-bottom: 1px solid #eee;
}
.seek-re>view:first-child{
	font-size: 28rpx;
	color: #333;
}
.seek-re-list{
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap: wrap;
}
.seek-re-list>view{
	width: auto;
	height: 46rpx;
	line-height: 46rpx;
	padding: 0 35rpx;
	border-radius: 25rpx;
	background: #f0f0f0;
	color: #666;
	font-size: 24rpx;
	margin-top: 20rpx;
	margin-right: 24rpx;
}

.haohuo_box{
	margin-bottom: 40rpx;
	margin-top: 24rpx;
	padding: 0 24rpx;
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
	clear: both;
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
	color: #888;
	font-size: 24rpx;
	text-align: center;
	height: 40rpx;
	line-height: 40rpx;
	padding-bottom: 22rpx;
	clear: both;
}
</style>
