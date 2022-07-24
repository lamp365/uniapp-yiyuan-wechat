<template>
	<view>
		<view class="tit">{{data2.title}}</view>
		<view class="content">
			<rich-text :nodes="data2.des"></rich-text>
		</view>
	</view>
</template>

<script>
	import {getAbout,getXieyi} from "../../api/myApi.js";
	import { shareMixins} from '@/mixins/share';
	export default {
		mixins: [shareMixins],
		data() {
			return {
				data2:{
					title:'',
					des:''
				},
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
			if(this.id  == 1){
				getAbout({get_about:1}).then(result=>{
					this.data2.des = this.imgDesc(result.about);
					this.data2.title = '关于我们';
				})
			}else{
				getXieyi({id:this.id}).then(result=>{
					this.data2 = result;
				})
			}
			
		},
		methods: {
			imgDesc(html){
			  // return str.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin-top:10px"');
				html = html.replace(/style=""/gi,'');
				html = html.replace(/<p>/gi,"<p style='width:100%'>");
				// html = html.replace(/<\/p>/gi,'');
				let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				    return match;
				  });
				  newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				    match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
				    return match;
				  });
				  // newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				  newContent = newContent.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin-top:0;margin-bottom:7px;"');
				  return newContent;
			}
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
