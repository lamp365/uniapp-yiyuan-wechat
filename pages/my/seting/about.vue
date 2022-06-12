<template>
	<view>
		<view class="tit">{{data2.title}}</view>
		<view class="content">
			<rich-text :nodes="data2.des"></rich-text>
		</view>
	</view>
</template>

<script>
	import {getAbout} from "../../api/myApi.js";
	export default {
		data() {
			return {
				data2:'',
				id:0
			}
		},
		onLoad(option) {
			var id = option.id;
			this.id = id;
			if(id == 1){
				//关于我们
				uni.setNavigationBarTitle({
					title:'关于我们'
				})
			}else if(id == 2){
				//隐私
				uni.setNavigationBarTitle({
					title:"关于隐私"
				})
			}else{
				//协议
				uni.setNavigationBarTitle({
					title:"注册协议"
				})
			}
		},
		onShow() {
			getAbout({id:id}).then(result=>{
				this.data2 = result;
			})
		},
		methods: {
			
		}
	}
</script>

<style>
.tit{
		padding: 22rpx 22rpx 0rpx 22rpx;
		font-size: 32rpx;
		color: #000;
		font-weight: bold;
		text-align: center;
			margin-top: 16rpx;
	}
.content{
	font-size: 28rpx;
	padding: 22rpx;

	font-weight: 500;
	line-height: 44rpx;
	text-indent:36rpx;
	line-height: 48rpx;
}
</style>
