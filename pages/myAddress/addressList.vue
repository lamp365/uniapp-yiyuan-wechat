<template>
	<view>
			<view class='address-management' :class='addressList.length < 1  ? "fff":""'>
				<view class='line'>
					<image src='../../static/line.jpg' v-if="addressList.length"></image>
				</view>
				<radio-group class="radio-group" @change="radioChange" v-if="addressList.length>0">
					<view class='item' v-for="(item,index) in addressList" :key="index">
						<view class='address' @click='goOrder(item.id,index)'>
							<view class='consignee'>收货人：{{item.name}}<text class='phone'>{{item.mobile}}</text></view>
							<view>收货地址：{{item.province}}{{item.city}}{{item.country}}{{item.detail}}</view>
						</view>
						<view class='operation acea-row row-between-wrapper'>
	
							<radio class="radio" :value="item.is_default.toString()" :checked="item.is_default==1 ? true : false"  color="#F73C41" @click.stop="setDefaultFunc(item.id,index)">
								<text>设为默认</text>
							</radio>
						
							<view class='acea-row row-middle'>
								<view @click.stop='createAddressFunc(item.id)'><text class='iconfont icon-bianjiwenjian icon'></text>编辑</view>
								<view @click.stop='delAddressFunc(item.id,index)'><text class='iconfont icon-rcd-trash-f icon'></text>删除</view>
							</view>
						</view>
					</view>
				</radio-group>
	
				<view class='noData' v-if="addressList.length < 1">
					<view class='pictrue'>
						<image src='../../static/no_data.png'></image>
					</view>
				</view>
				<view style='height:120rpx;'></view>
				
				<view class="goback">
					<text class="icon-back icon iconfont" @click="gotoBack()"></text>
				</view>
				
				
				<view class='footer acea-row row-between-wrapper'>
					<view class='addressBnt on'  @click='createAddressFunc(0)'>
						<text class='iconfont icon-dizhi icon'></text>添加新地址
					</view>
					<view class=""></view>		
	
				</view>
			</view>
		</view>
</template>

<script>
	import {getAddressList,addressDefault,delAddress} from "../api/addressApi.js";
	export default {
		data() {
			return {
					addressList: []
			};
		},
		onShow() {
				this.getAddressListFunc();
		},
		methods: {
			getAddressListFunc(){
				getAddressList().then(result=>{
					this.addressList = result;
				})
			},
			goOrder: function(id,index) {
				if(this.addressList[index].is_default == 1){
					uni.navigateTo({
						url:"../jiesuan/jiesuan"
					})
				}else{
					addressDefault({id:id}).then(resMsg => {
						for(var i=0;i<this.addressList.length;i++){
							this.addressList[i].is_default = 0;
						}
						this.addressList[index].is_default = 1
						uni.navigateBack({
							delta:1
						})
					})
				}
			},
			createAddressFunc(id){
				uni.navigateTo({
					url:'../myAddress/myAddress?id='+id,
				})
			},
			delAddressFunc(id,index){
				delAddress({id:id}).then(result=>{
					this.addressList.splice(index, 1);
				});	
			},
			setDefaultFunc(id,index){
				let address = this.addressList[index];
				if(address.is_default == 1){
					return false;
				}
				addressDefault({id:id}).then(res => {
					for(var i=0;i<this.addressList.length;i++){
						this.addressList[i].is_default = 0;
					}
					this.addressList[index].is_default = 1;
					uni.showToast({
						title: '操作成功',
						duration: 1500,
						icon: 'success'
					})
				});
			},
			radioChange: function(e) {
					let index = parseInt(e.detail.value);
					
			},
			gotoBack(){
			  uni.navigateBack({
				 delta:1
			  })
			},
		}
	}
</script>

<style>
	page{
		background: #f8f8f8;
	}
.address-management.fff {
		background-color: #fff;
		height: 1300rpx
	}

	.address-management .line {
		width: 100%;
		height: 3rpx;
	}

	.address-management .line image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.address-management .item {
		background-color: #fff;
		padding: 0 30rpx;
		margin-bottom: 12rpx;
	}

	.address-management .item .address {
		padding: 30rpx 0;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;
	}

	.address-management .item .address .consignee {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 8rpx;
	}

	.address-management .item .address .consignee .phone {
		margin-left: 25rpx;
	}

	.address-management .item .operation {
		height: 83rpx;
		font-size: 28rpx;
		color: #282828;
		display: flex;
		align-items: center;
	}
	.address-management .item .operation .row-middle{
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}
	.address-management .item .operation .radio text {
		margin-left: 13rpx;
	}

	.address-management .item .operation .iconfont {
		color: #676565;
		font-size: 35rpx;
		vertical-align: -2rpx;
		margin-right: 10rpx;
	}

	.address-management .item .operation  .icon-rcd-trash-f {
		margin-left: 40rpx;
	}

	.address-management .footer {
		position: fixed;
		width: 100%;
		background-color: #fff;
		bottom: 0;
		height: 106rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.address-management .footer .addressBnt {
		width: 94%;
		margin-left: 3%;
		height: 76rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 76rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: #F73C41;
		margin-top: 16rpx;
	}


	.address-management .footer .addressBnt .iconfont {
		font-size: 35rpx;
		margin-right: 8rpx;
		vertical-align: -1rpx;
	}

	.address-management .footer .addressBnt.wxbnt {
		background-color: #FE960F;
	}
	.noData{
		justify-content: center;
		display: flex;
	}
.noData image{
	margin-top:40%;
	width: 240rpx;height: 240rpx;
}
 .goback .icon{
	 font-size:80rpx;
	 position: fixed;
	 bottom: 220rpx;
	 right: 36rpx;
	 color: #F73C41;
 }
</style>
