<template>
	<view>
		<view class="top_bg"><image src="/static/fuli-bj.jpg" mode="widthFix"></image></view>
		<view style="height: 40rpx;"></view>
		
		 <view class="tejia_list" v-for="(item,index) in newProduct" :key="index" @click="gotoProduct(item.id)">
		    <view class="left">
		        <image :src="item.main_img_url"></image>
		        <view class="show_tejia">新人首单特价</view>
		    </view>
		    <view class="right">
		        <view class="tit">{{item.name}}</view>
		        <view class="shoudan">
		            <view>原价：</view><view class="old_price">¥{{item.sale_price}}</view>
		          </view>
		        <view class="info_bottom">
		          <view class="shoudan">
		            <view>首单价：</view><view class="price">¥{{item.active_price}}</view>
		          </view>
		          <view class="liji">立即抢购</view>
		        </view>
		    </view>
				
					<view class="goback"><text class="iconfont icon-back" @click.stop="gotoMy()"></text></view>
		  </view>
	</view>
</template>

<script>
	import {getNewProduct} from "../api/productApi.js";
	export default {
		data() {
			return {
				newProduct:[]
			}
		},
		onShow() {
			this.getNewProductFunc();
		},
		methods: {
			getNewProductFunc(){
				getNewProduct().then(result=>{
					this.newProduct = result;
				})
			},
			gotoProduct(id){
				uni.navigateTo({
					url:"./product?id="+id
				})
			},
			gotoMy(){
				console.log(222);
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style>
.top_bg image{
	width: 100%;
	height: auto;
}
/* 新人特价 */
.tejia_list{
  margin-bottom: 24rpx;
  width: 94%;
  margin-left: 3%;
  height: 240rpx;
  border-radius: 16rpx;
  background: #ffedde;
  display: flex;
	border: 1px solid #f2f2f2;
	box-shadow: 0 4px 9px rgb(0 0 0 / 6%);
	

}

.tejia_list .left {
  height: 240rpx;
  width: 240rpx;
  position: relative;
  background: #ffffff;
  border-top-left-radius: 16rpx;
  border-bottom-left-radius: 16rpx;
}
.tejia_list .left image{height: 100%;width: 100%;border-top-left-radius: 16rpx;border-bottom-left-radius: 16rpx;}
.tejia_list .right{flex: 1;padding: 0px 24rpx;}
.show_tejia{position: absolute;bottom: 0rpx;left: 0rpx;text-align: center;font-size: 24rpx;color: #ffffff;
  width:240rpx;
  border-bottom-left-radius: 16rpx; 
  background: rgba(212, 48, 56, 0.7) !important;}
  
.tejia_list .tit{font-size: 24rpx;color: #0a0a0a;height: 100rpx;line-height: 46rpx;margin-top: 12rpx;}
.tejia_list .cate{font-size: 24rpx;color: #0a0a0a;}
.tejia_list .info_bottom{
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tejia_list .shoudan{font-size: 24rpx;font-weight: bolder;display: flex;align-items: baseline;}
.tejia_list .shoudan .price{font-size: 32rpx;color: red}
.tejia_list .liji{float: right;color: #ffffff;border-radius: 36rpx;padding: 4rpx 24rpx;background: red;font-size: 24rpx;}
.old_price{font-size: 26rpx;text-decoration: line-through;}
.show_tips{
  width: 89%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30rpx;
  background-color: #ffffff;
  color: rgb(240, 64, 64);
  font-weight: 200;
  padding: 20rpx;
  font-size: 28rpx;
  border-radius: 20rpx;
  margin-bottom: 38rpx;
}
	.goback{position: fixed;right: 40rpx;bottom: 180rpx;background: #fff;border-radius: 36rpx;}
	.goback .icon-back{color: #ff0000;font-size: 80rpx;}
</style>
