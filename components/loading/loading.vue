<template>
	<view v-if="loadModal">
		<view class="load-modal" >
			<image src="/static/loading.gif"></image>
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		loadModal: true
	},
	data() {
		return {};
	},
	methods: {
		/* LoadModal(e) {
			this.loadModal = true;
			setTimeout(() => {
				this.loadModal = false;
			}, 2000);
		} */
	}
}

</script>

<style>
.load-modal{
	text-align: center;
	margin-top: 40rpx;
}
.load-modal image{
	width: 70rpx;
	height: 70rpx;
	margin: auto;
}
.load-modal .gray-text{
	font-size: 24rpx;
	color: #666666;
}
</style>
