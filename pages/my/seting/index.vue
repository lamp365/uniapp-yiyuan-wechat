<template>
	<view>
		<view class="user-setting">
			<view class="item" @click="gotoPage('/pages/my/seting/connect')">
				<view>联系我们</view>
				<view><text class="iconfont icon-gengduo"></text></view>
			</view>
			
			<view style="height: 16rpx;"></view>
			<view class="item"  @click="gotoPage('/pages/my/seting/about?id=1')">
				<view>关于我们</view>
				<view><text class="iconfont icon-gengduo"></text></view>
			</view>
			
			<view class="item" @click="gotoPage('/pages/my/seting/about?id=2')">
				<view>关于隐私</view>
				<view><text class="iconfont icon-gengduo"></text></view>
			</view>
			<view class="item" @click="gotoPage('/pages/my/seting/about?id=3')">
				<view>注册协议</view>
				<view><text class="iconfont icon-gengduo"></text></view>
			</view>
			<view class="item" @click="cleanData()">
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
			},
			cleanData(){
				uni.removeStorageSync('openid');
				uni.removeStorageSync('userinfo');
				uni.removeStorageSync('sysInfo');
				uni.removeStorageSync('has_h5_auth_key');
				uni.navigateTo({
					url:"../../index/index"
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
