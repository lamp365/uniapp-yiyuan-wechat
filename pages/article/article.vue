<template>
	<view class="main_box">
		
		<uni-list v-if="listData.length > 0">
			<uni-list-item v-for="(item,index) in listData" showArrow :title="item.title" :key="index"  link="redirectTo" :to="goToContent(item.id)" />
		</uni-list>
		
		
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
    import {getArticleList} from "../api/articleApi.js";
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
		onLoad() {
			this.getArticleListFunc();
		},
		methods: {
			getArticleListFunc(){
				this.loading = true;
				this.loadTitle = "加载中";
				getArticleList({page:this.page}).then(response=>{
					var result = response.list;
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
				return url;
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
	background-color: #f8f8f8;
}
.main_box{
	padding: 20rpx 30rpx;
}
	.loadingicon{color: #666;text-align: center;margin-top: 12rpx;}
	.c_loading .iconfont{font-size: 50rpx;}
	.c_loadTitle{font-size: 24rpx;}
	.goback{position: fixed;right: 40rpx;bottom: 180rpx;background: #fff;border-radius: 48rpx;}
	.goback .icon-back{color: #1db0fc;font-size: 80rpx;}
</style>
