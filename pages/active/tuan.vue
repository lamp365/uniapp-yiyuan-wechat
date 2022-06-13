<template>
	<view>
		<view class="top_bj">
			<image src="../../static/pingtuan-bj.png" mode="widthFix"></image>
		</view>
	
		<view class="main">
			
			<view class="no_data"  v-if="product.length ==0" style="">
				<view style="justify-content: center;display: flex;">
					 <image src="../../static/no_data.png" style="margin-top: 100rpx;width: 280rpx;height: 280rpx;"></image>
				</view>
							
				 <view style="height: 48rpx;"></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				product:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background: #e93323;
	}
.top_bj image{
	width: 100%;
	height: auto;
}
.main{
	background-color: #fff;
	border: 6px solid #fc8b42;
	border-radius: 30px;
	margin: 0rpx 30rpx 66rpx 30rpx;
	padding: 0 24rpx;
	min-height: 800rpx;
}
</style>
