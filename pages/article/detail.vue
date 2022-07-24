<template>
	<view class="box">
		<view class="title">{{title}}</view>
		<view class="tit_info">
			<text class="txt">时间：{{create_time}}</text>
			<text class="txt">阅读：{{reading}}</text>
		</view>
		<view class="content">
			<rich-text :nodes="description"></rich-text>
		</view>
	</view>
</template>

<script>
	import {getContent} from "../api/articleApi.js";
	import { shareMixins} from '@/mixins/share';
	export default {
		mixins: [shareMixins],
		data() {
			return {
				id:0,
				title:'',
				create_time:'',
				reading:'',
				description:'',
				web_name:'',
				sharePic:'http://qiniu.qzyzt.com/20220312222829622cae0d53c00.jpg',
			}
		},
		onShow() {
			this.sysInfo = uni.getStorageSync('sysInfo');
			this.web_name = this.sysInfo.shop_name;
			if(this.sysInfo != '' && this.sysInfo.share_img != '' && this.sysInfo.share_img!=undefined){
				this.sharePic = this.sysInfo.share_img;
			}
		},
		onShareAppMessage(res) {
			return {
				title:this.web_name,
				path:'/pages/index/index',
				desc:'发现一款日常健康小知识很有用的小程序，分享给你来看看吧！',
				imageUrl: this.sharePic
			}
		},
		onShareTimeline(res) {
			return {
				title:this.web_name,
				query:'a=1&b=2',
				desc:'发现一款日常健康小知识很有用的小程序，分享给你来看看吧！',
				imageUrl:this.sharePic
			}
		},
		onLoad(option){
			var that = this;
			this.id = option.id;
			getContent({id:this.id}).then(result=>{
				this.title = result.title;
				this.create_time = result.create_time;
				this.reading = result.reading;
				this.description= that.imgDesc(result.description);
			})
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
.box{
	padding: 20rpx 34rpx;
}
.title{
	text-align: left;
	font-size: 30rpx;
	font-weight: bold;
	line-height: 54rpx;
	margin-bottom: 10rpx;
	color: #000000;
}
.tit_info{
	text-align: left;
	color: #888;
	font-size: 24rpx;
	color: ;
}
.tit_info .txt{
	margin-right: 24rpx;
}
.content{
	margin-top:30rpx;
	font-size: 28rpx;
	line-height: 48rpx;
	overflow: hidden;
	margin-bottom: 40rpx;
}
.content image{
	width: 95%;
	margin-left: auto;
	margin-right: auto;
}

</style>