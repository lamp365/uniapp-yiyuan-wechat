<template>
	<view>
		<view v-if="messageData.length > 0">
			<uni-list :border="false">
				<uni-list-item v-for="(item,index) in messageData" :key="index" :border="true" :title="item.state_str" :note="item.msg" :rightText="item.create_time" />
			</uni-list>
			
		</view>
		
		<view v-else>
			<view class="no_data" style="justify-content: center;display: flex;">
			  <image src="../../../static/no_data.png" style="margin-top: 160rpx;width: 240rpx;height: 240rpx;"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {messageList} from "../../api/myApi.js";
	export default {
		data() {
			return {
				messageData:[]
			}
		},
		onLoad() {
			messageList().then(result=>{
				this.messageData = result;
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
