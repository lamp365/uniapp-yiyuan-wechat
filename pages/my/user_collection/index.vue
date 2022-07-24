<template>
	<view>	
		<view class="collectionGoods"  v-if="product.length >0">
			<view class="item" v-for="(item,index) in product" :key="index" @click="gotoProduct(item.id)" >
				<view class="picture">
					<image :src="item.main_img_url" mode=""></image>
				</view>
				<view class="right">
					<view class="tit">{{item.name}} </view>
					<view class="bottom">
						<view class="price" v-if="item.type==0">￥{{item.sale_price}}</view>
						<view class="price" v-else>￥{{item.active_price}}</view>
						<view class="quxiao_collect" @click.stop="removeItem(item.id,index)">
							移除
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="no_more">
				没有更多内容啦~
			</view>
		</view>
		
		
		<view class="no_data"  v-if="product.length ==0" style="">
			<view style="justify-content: center;display: flex;">
				 <image src="../../../static/no_data.png" style="margin-top: 100rpx;width: 280rpx;height: 280rpx;"></image>
			</view>
						
			 <view style="height: 48rpx;"></view>
		</view>
		
		<view class="goback" ><text class="iconfont icon-back" @click="gotoMy()"></text></view>
	</view>
</template>

<script>
	import {getCollectList,collectProduct} from "../../api/myApi.js";
	import { shareMixins} from '@/mixins/share';
	export default {
		mixins: [shareMixins],
		data() {
			return {
				product:[]
			}
		},
		onLoad() {
			getCollectList().then(result=>{
				this.product = result;
			})
		},
		methods: {
			removeItem(id,inde){
				collectProduct({id:id}).then(result=>{
					uni.showToast({
						title:'移除收藏成功',
						duration:2000,
						icon:"success"
					});
					var productData = this.product;
					  productData.splice(productData.index, 1); //删除数组某一项
					  this.product = productData;
				})
			},
			gotoMy(){
				uni.navigateBack({
					delta:1
				})
			},
			gotoProduct(id){
				uni.navigateTo({
					url:"../../product/product?id="+id
				})
			},
		}
	}
</script>

<style>
page{
	background-color: #f8f8f8;
}
.collectionGoods{
	    background-color: #fff;
	    border-top: 2px solid #eee;
}
.item{
	margin-left: 32rpx;
	margin-right: 32rpx;
	border-bottom: 2rpx solid #eee;
	height: 190rpx;
	display: flex;
	justify-content: space-between;
}
.picture{
    width: 155rpx;
    height: 155rpx;
	margin-top: 16rpx;
}
.picture image{
	width: 100%;
	height: 100%;
}
.item .right{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 28rpx;
	color: #282828;
	padding: 22rpx;
}
.item .right .bottom{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.price{
	color: #fd502f;
}
.quxiao_collect{
	    font-size: 26rpx;
	    color: #282828;
	    width: 130rpx;
	    height: 40rpx;
	    border: 2rpx solid #bbb;
	    border-radius: 24rpx;
	    text-align: center;
	    line-height: 40rpx;
}
.no_more{
	width: 100%;
	height: 84rpx;
	overflow: hidden;
	color: #999;
	line-height: 84rpx;
	text-align: center;
	font-size: 28rpx;
}
	.no_data{
		min-height: 600rpx;
	}
	.goback{position: fixed;right: 40rpx;bottom: 74rpx;background: #fff;border-radius: 48rpx;}
	.goback .icon-back{color: #1db0fc;font-size: 80rpx;}
</style>
