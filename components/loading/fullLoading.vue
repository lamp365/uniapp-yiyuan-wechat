<template>
	<view class="fullLoading" v-if="loadModal">
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
.fullLoading{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color:rgba(126,125,125,0.4);
	z-index: 9999;
}
.fullLoading .load-modal{
	text-align: center;
	margin-top: 50%;
}
.fullLoading .load-modal image{
	width: 80rpx;
	height: 80rpx;
	margin: auto;
}
.fullLoading .load-modal .gray-text{
	font-size: 24rpx;
	color: #666666;
}
</style>
