<template>
	<view style="background: #f8f8f8;">
			<form @submit="formSubmit">
				<view class='addAddress'>
					<view class='list'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>姓名</view>
							<input type='text' placeholder='请输入姓名' name='real_name' :value="userAddress.name"
								placeholder-class='placeholder'></input>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>联系电话</view>
							<input type='number' placeholder='请输入联系电话' name="phone" :value='userAddress.mobile'
								placeholder-class='placeholder' pattern="\d*"></input>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>所在地区</view>
							<view class="address">
								<picker mode="multiSelector" @change="bindRegionChange"
									@columnchange="bindMultiPickerColumnChange" :value="valueRegion" :range="multiArray">
									<view class='acea-row'>
										<view class="picker">{{region[0]}}，{{region[1]}}，{{region[2]}}</view>
										<view class='iconfont icon-dizhi fontcolor'></view>
									</view>
								</picker>
							</view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>详细地址</view>
							<input type='text' placeholder='请填写具体地址' name='detail' placeholder-class='placeholder'
								:value='userAddress.detail'></input>
						</view>
					</view>
					<view class='default acea-row row-middle' @click='ChangeIsDefault'>
						<checkbox-group>
							<checkbox :checked="userAddress.is_default ? true : false" />设置为默认地址
						</checkbox-group>
					</view>
	
					<button class='keepBnt bg-color' form-type="submit">立即保存</button>
					<!-- #ifdef MP -->
					<view class="wechatAddress" v-if="!id" @click="getWxAddress">导入微信地址</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view class="wechatAddress" v-if="this.$wechat.isWeixin() && !id" @click="getAddress">导入微信地址</view>
					<!-- #endif -->
				</view>
			</form>

			<!-- #ifndef MP -->
			<home></home>
			<!-- #endif -->
		</view>
</template>

<script>
	import {getAddress} from "../api/addressApi.js";
	export default {
		data() {
			return {
				regionDval: ['浙江省', '杭州市', '滨江区'],
				cartId: '', //购物车id
				pinkId: 0, //拼团id
				couponId: 0, //优惠券id
				id: 0, //地址id
				userAddress: {}, //地址详情
				region: ['省', '市', '区'],
				valueRegion: [0, 0, 0],
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				district: [],
				multiArray: [],
				multiIndex: [0, 0, 0],
				cityId: 0,
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '110101',
				news: '',
				noCoupon: 0
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
					title: options.id ? '修改地址' : '添加地址'
			})
			this.id = option.id;
			if(option.id){
				this.getUserAddress();
			}
			this.getCityList();
		},
		methods: {
			getUserAddress: function() {
				getAddress({id:this.id}).then(res => {
					this.userAddress = res;
					let region = [res.province, res.city, res.district];
					this.region = region;
					this.cityId = res.city_id
				});
			},
		}
	}
</script>

<style>

</style>
