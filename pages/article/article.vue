<template>
	<view class="main_box">
		
		<view class="artitle_list_box" v-for="(item,index) in listData" :key="index" @click="goToContent(item.id)">
				<view class="pic"><image :src="item.picture" mode=""></image></view>
				<view class="right">
					<view class="title">{{item.title}}</view>
					<view class="read">{{item.reading}}次阅读</view>
				</view>
		</view>
		
		
		<view class="loadingicon" v-if="listData.length > 0">
			<view class="c_loading">
				<text class="iconfont icon-jiazaizhong" v-if="loading"></text>
			</view>	
			<view class="c_loadTitle">
				{{ loadTitle }}
			</view>	
			
		</view>
		<view v-if="listData.length == 0">
			<view class="no_data" style="justify-content: center;display: flex;">
			  <image src="../../static/no_data.png" style="margin-top: 160rpx;width: 240rpx;height: 240rpx;"></image>
			</view>
		</view>
		
		<view style="height: 40rpx;"></view>
		<view class="goback"><text class="iconfont icon-back" @click="gotoMy()"></text></view>
		
	</view>
</template>

<script>
    import {getArticleAnli} from "../api/articleApi.js";
	import { shareMixins} from '@/mixins/share';
	export default {
		mixins: [shareMixins],
		data() {
			return {
				listData:[],
				page:1,
				loadTitle:'------祝您早日康复！------',
				tempTitle:'------祝您早日康复！------',
				loading:false,
				has_finish:false
			}
		},
		onShow() {
			var cacheData = uni.getStorageSync('sysInfo');
			this.loadTitle = cacheData.copyright;
			this.tempTitle = cacheData.copyright;
		},
		onLoad() {
			this.getArticleListFunc();
		},
		methods: {
			getArticleListFunc(){
				this.loading = true;
				this.loadTitle = "加载中";
				getArticleAnli({page:this.page}).then(response=>{
					var result = response;
					this.loading = false;
					this.loadTitle = this.tempTitle;
					if(result.length < 1){
						this.has_finish = true;
					}else{
						this.has_finish = false;
						var resultData = this.listData.concat(result);
						this.listData = resultData;
					}
				})
			},
			goToContent(id){			
				var url = "./detail?id="+id;
				uni.navigateTo({
					url:url
				})
			},
			gotoMy(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style>
page{
	background: #fff;
}
.main_box{
	padding: 20rpx 30rpx;
	
}
/* article list */
	.artitle_list_box{
		padding: 0rpx 20rpx 16rpx 20rpx;
		display: flex;
		margin-top: 24rpx;
		border-bottom: 1px solid #e9e9e9;
	}
	.artitle_list_box .pic image{
		width: 200rpx;
		height: 130rpx;
	}	
	.artitle_list_box .right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10rpx 0rpx 22rpx 20rpx;
	}
	.artitle_list_box .right .title{
		font-size: 28rpx;
		color: #000;
	}
	.artitle_list_box .right .read{
		font-size: 24rpx;
		color: #888;
	}
	
	.loadingicon{color: #666;text-align: center;margin-top: 12rpx;}
	.c_loading .iconfont{font-size: 50rpx;}
	.c_loadTitle{font-size: 24rpx;}
	.goback{position: fixed;right: 40rpx;bottom: 180rpx;background: #fff;border-radius: 48rpx;}
	.goback .icon-back{color: #1db0fc;font-size: 80rpx;}
</style>
