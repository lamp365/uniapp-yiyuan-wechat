<template>
	<view>
		<view class="main_box">
				<uni-search-bar radius="16" placeholder="请输入搜索名称" v-model="searchValue" :value="searchValue" clearButton="always" cancelButton="always" @confirm="search" cancelText="确定"
						@cancel="sureSearch()" />
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'',
			}
		},
		methods: {
			sureSearch(){
				
			},
		}
	}
</script>

<style>

</style>
