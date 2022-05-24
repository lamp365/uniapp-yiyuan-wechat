<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
		@import url("./static/iconfont.css");
	/*每个页面公共css */
	/* 全局取消滚动条 */
	::-webkit-scrollbar{
	      display: none;
	}
</style>
