<template>
	<view>
		<view class="user-setting">
			<view class="item" @click="gotoPage('/pages/my/about/contect')">
				<view>联系我们</view>
				<view><text class="iconfont icon-gengduo"></text></view>
			</view>
			
			<view style="height: 16rpx;"></view>
			<view class="item"  @click="gotoPage('/pages/my/about/us')">
				<view>关于我们</view>
				<view><text class="iconfont icon-gengduo"></text></view>
			</view>
			
			<view class="item" @click="gotoPage('/pages/my/about/yinsi')">
				<view>关于隐私</view>
				<view><text class="iconfont icon-gengduo"></text></view>
			</view>
			<view class="item" @click="gotoPage('/pages/my/about/xieyi')">
				<view>注册协议</view>
				<view><text class="iconfont icon-gengduo"></text></view>
			</view>
			<view class="item" @click="gotoPage('/pages/my/about/clean')">
				<view>清除缓存</view>
				<view><text class="iconfont icon-gengduo"></text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoPage(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
page{
	background: #f8f8f8;
}
.user-setting .item{
    padding: 30rpx;
    border-bottom: 1rpx solid #f2f2f2;
    font-size: 30rpx;
    color: #242424;
		display: flex;
		justify-content: space-between;
		background: #fff;
}
</style>
