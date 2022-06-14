<template>
	<view>
		<view class="goodsStyle">
			<view class="pictrue"><image :src="order.snap_img" mode=""></image></view>
			<view class="right">
				<view class="title">{{order.snap_name}}</view>
				<view class="price">
					<view>￥{{order.money}}</view><view>x{{order.buy_num}}</view>
				</view>
			</view>
		</view>
		
		<view class="list">
			<view class="item">
				<view>退款件数</view><view>{{order.buy_num}}</view>
			</view>
			<view class="item">
				<view>退款类型</view><view>仅退款</view>
			</view>
			<view class="item">
				<view>退款原因</view><view>{{after == 1 ? '仅退款':'退货退款'}}</view>
			</view>
			<view class="pingzheng">
				<view class="top">
					<view>上传凭证</view><view class="tip">( 最多上传5张 )</view>
				</view>
				<view class="up_pic_box">
					<view v-for="(item,index) in imgList">
						<view class="cancle" @click="bindDelete(index)">X</view>
						<image :src="item" mode=""></image>
					</view>
					<image src="../../static/camera.jpg" mode="" class="up_icon" @click="uploadPhoto()"></image>
				</view>
			</view>
		</view>
		
		<view class="sure_btn">申请退款</view>
	</view>
</template>

<script>
	 import {getApplyedOrder,applyedOrder} from "../api/orderApi.js";
	 import Config from '@/pages/utils/config.js';
	export default {
		data() {
			return {
				id:0,
				order:'',
				after:1,
				curTotal:0,
				imgList:[],
				imgUrl:[]
			}
		},
		onLoad(option) {
			if(option.id != null || option.id != undefined){
				this.id = option.id;
			}else{
				uni.navigateBack({
					delta:1
				})
				return '';
			}
			
			getApplyedOrder({id:this.id}).then(result=>{
				this.order = result;
				if(result.status == 2){
					this.after = 1;
				}else if(result.status == 3){
					this.after = 2;
				}
			})
		},
		methods: {
			uploadPhoto(){
				if(this.curTotal == 5){
					return '';
				}
				var _self = this;
				var host_url = Config.restUrl;
				host_url = host_url.slice(0,-7);
				
				 uni.chooseImage({
				
				        count: 1,// 图片选择，只支持一次选择一张图片
				
				        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				
				        sourceType: ['album', 'camera'], //从相册、相机选择
				
				        success: function (res) {
				
				            console.log('res:', res)
				
				            _self.curTotal++;
				
				            _self.imgList.push(res.tempFilePaths[0]);
				
				            const tempFilePaths = res.tempFilePaths[0];
				
										//加载中
				            // 图片上传
				
				            const uploadTask = uni.uploadFile({
				
				                url : host_url+'admin/UpFiles/upload', // post请求地址
				
				                filePath: tempFilePaths,
				
				                name: 'file',  // 待确认
				
				                header: {
				
				                    'Content-Type': 'multipart/form-data',
														'token': uni.getStorageSync('token'),
														'shopToken': Config.shopToken 
				
				                },
				
				                success: function (uploadFileRes) {
				
				                    console.log('Success:', uploadFileRes);
				
				                    // _self.imgUrl.push(JSON.parse(uploadFileRes.data).data.fileId);
				
				                },
				
				                fail: function (uploadFileFail) {
				
				                    console.log('Error:', uploadFileFail.data);
				
				                },
				
				                complete: ()=> {
				
				                    console.log('Complete:');
				
				                }
				
				            });
				
				        },
				
				        error : function(e){
				
				            console.log(e);
				
				        }
				
				   });
			},
			
			 bindDelete(index){
			    var temp = this.imgList;
					 var temp2 = this.imgUrl;
			    temp.splice(index,1);
					 temp2.splice(index,1);
			    this.imgList = temp;
					this.imgUrl = temp2;
			  },
		}
	}
</script>

<style>
page{
	background: #f8f8f8;
}
.goodsStyle{
	margin-top: 1rpx;
	background-color: #fff;
	padding: 22rpx 30rpx;
	display: flex;
}
.goodsStyle .pictrue {
    width: 120rpx;
    height: 120rpx;
}
.goodsStyle .pictrue image {
    width: 100%;
    height: 100%;
    border-radius: 6rpx;
}
.goodsStyle .right{
	    font-size: 28rpx;
	    color: #999;
			flex: 1;
			display: flex;
			justify-content: space-between;
			padding-left: 20rpx;
			margin-top: 18rpx;
}
.goodsStyle .right .price{
	font-size: 28rpx;
	text-align: right;
	padding-left: 16rpx;
}
.goodsStyle .right .title{
	flex: 1;
	text-overflow: ellipsis;
	word-wrap: break-word;
	word-break: break-all;
	white-space: normal;
	overflow: hidden;
	color: #282828;
	font-size: 28rpx;
}
.list{
	    background-color: #fff;
	    margin-top: 18rpx;
}
.item{
	    padding-left: 30rpx;
	    padding-right: 30rpx;
	    min-height: 90rpx;
	    border-bottom: 2rpx solid #eee;
	    font-size: 30rpx;
	    color: #333;
			display: flex;
			justify-content: space-between;
			align-items: center;
}
.pingzheng{
	padding-left: 30rpx;
	padding-right: 30rpx;
	min-height: 90rpx;
	font-size: 30rpx;
	color: #333;
	margin-top: 22rpx;
	border-bottom: 2rpx solid #eee;
}
.pingzheng .top{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.tip{
	color: #bbb;
}
.up_pic_box{
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	margin-top: 30rpx;
}
.up_pic_box>view {
    width: 180rpx;
    height: 180rpx;
    margin-right: 28rpx;
    border: 2rpx solid #cdcdcd;
    box-sizing: border-box;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    position: relative;
}
.up_pic_box .cancle {
    position: absolute;
    right: -20rpx;
    top: -20rpx;
    width: 40rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    font-size: 20rpx;
    color: #fff;
    background: #f00;
    border-radius: 50%;
    margin: 10rpx;
		z-index: 550;
}
.up_pic_box>view>image {
    width: 100%;
    height: 100%;
}
.up_icon{
    width: 180rpx;
    height: 180rpx;
    border: 2rpx solid #cdcdcd;
    box-sizing: border-box;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
}
.sure_btn{
	    font-size: 32rpx;
	    color: #fff;
	    width: 92%;
			margin-left: 3%;
	    height: 86rpx;
	    border-radius: 50rpx;
	    text-align: center;
	    line-height: 86rpx;
	    margin-top: 42rpx;
			background: #e93323;
}
</style>
