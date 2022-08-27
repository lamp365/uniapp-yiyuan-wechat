<template>
	<view>
		<view class="moves_box" v-if="movesList.length>0">
			<view class="move_list" v-for="(item,index) in movesList" :key="index">
				 <video class="myVideo" :src="item.video" :loop="true" :poster="item.image" 
					:show-center-play-btn="true" :show-fullscreen-btn="true"
				                    @error="videoErrorCallback"  enable-danmu danmu-btn controls></video>
					<view class="v_title">{{item.title}}</view>
			</view>
		
		</view>
		
		<view v-if="movesList == '' || movesList.length<1" class="no_data">
			<image src="../../static/no_data.png" mode=""></image>
		</view>
		
		<view style="height: 40rpx;"></view>
		<view class="goback"><text class="iconfont icon-back" @click="gotoHome()"></text></view>
	</view>
</template>

<script>
		import {getVideoAnli} from "../api/articleApi.js";
	export default {
		data() {
			return {
				pageSize:20,
				page:1,
				movesList:[],
				has_finish:false
			}
		},
		onLoad() {
			this.getMovesList();
		
		},
		onReachBottom(){
			console.log("我已经滚动到底部了");
			if(!this.has_finish){
				this.page += 1;
				this.getMovesList();
			}
				
		},
		methods: {
			getMovesList(){
				var params ={
					pageSize:this.pageSize,
					page:this.page
				}
				getVideoAnli(params).then(result=>{
					if(result.length > 0){
						var resultData = this.movesList.concat(result);
						this.movesList = resultData;
					}else{
						this.has_finish = true;
					}
					
				})
			},
		
			gotoLink(){
				uni.navigateTo({
					url:"../link/link"
				})
			},
			gotoHome(){
				uni.switchTab({
					url:"../index/index"
				})
			}
		}
	}
</script>

<style>
/* MOVES */
	.moves_box{
		padding: 20rpx;
		overflow: hidden;
	}
	.moves_box .move_list{
		width: 48%;
		float: left;
		border-radius: 20rpx;
		height: 278rpx;
		margin-bottom: 40rpx;
	}
	.moves_box .move_list:nth-child(even){
		float: right;
	}
		.moves_box .move_list video{
			width: 100%;
			height: 200rpx;
			border-radius: 20rpx;
		}
		.v_title{font-size: 28rpx;overflow: hidden;}
		.no_data{
			display: flex;
			justify-content: center;
		}
		.no_data image{
			width: 220rpx;
			height: 220rpx;
			margin-top: 150rpx;
		}
		.goback{position: fixed;right: 40rpx;bottom: 180rpx;background: #fff;border-radius: 48rpx;}
		.goback .icon-back{color: #1db0fc;font-size: 80rpx;}
</style>