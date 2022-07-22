<template>
	<view>
		<!--pages/cart/cart.wxml-->
		<view v-if="cartData.length>0">
			<view class="header">
				<view>{{sysData.shop_name}}</view>
				
				<view class="tel">
					<image class="tel" src="../../static/mobile2.png" @click="callMobile()"></image>
				</view>
			</view>
			<view class="send_time">
				<text>{{sysData.address}}</text>
			</view>
		</view>
		
	<view v-if="cartData.length>0">
		<view class='container cart-container'>
		
		    <view class='cart-box'>
		     
		        <view class='cart-item'  v-for="(item,index) in cartData" :key="index">
		          <view class='cart-item-main'>
		
		            <view class='cart-item-checkbox' @click="toggleSelect(item,index)">
		              <image v-if="item.selectStatus" src='../../static/circle@selected.png'></image>
		              <image v-else src='../../static/circle@noselected.png'></image>
		            </view>
		
		            <view class='cart-item-img' @click="gotoProduct(item.id)">
		              <image class='good-image' :src='item.main_img_url'></image>
		            </view>
		
		            <view class='cart-item-word'>
		              <view class='title-box'>
		                <text class='title' @click="gotoProduct(item.id)">{{item.name}}</text>
		      
		                <text v-if="item.type == 0">￥{{item.sale_price}}</text>
		                <text v-else>￥{{item.active_price}}</text>
		              </view>
									<view class="show_spec">
										规格：{{item.spec_name}}
									</view>
		              <view class='bottom-box'>
		                <view class='cart-item-counts'>
		                  <view class="btns" @click="changeCounts(item,'cut',index)"><text class="iconfont icon-jianshao icon"></text></view>
		                  <view class='counts'>{{item.counts}}</view>
		                  <view class='btns' @click="changeCounts(item,'add',index)"><text class="iconfont icon-zengjia icon"></text></view>
		                </view>
		
		                <view class='delete'  @click="deleteItem(item,index)"><text class="iconfont icon-rcd-trash-f delicon"></text></view>
		              </view>
		            </view>
		
		
		          </view>
		        </view>
		     
		    </view>
		  </view> 
		
		  
		  <view class='footer-account-box all-accounts-box'>
		
		    <view class='all-select' @click="toggleSelectAll()" >
		
		      <image v-if="selectedTypeCounts==cartData.length" class='title-icon' src='../../static/circle@selected.png'></image>
		
		      <image v-else class='title-icon' src='../../static/circle@noselected.png'></image>
		
		      <text>全选({{selectedCounts}})</text>
		
		    </view>
		
		    <view :class="[canToBuyClass()]" @click='submitOrder()'>
		      <view class='accounts-btn'>总计</view>
		
		      <view class='price-text'>￥{{account}}</view>
		
		      <view class='arrow-icon'>
						  <view v-if="account==0" class='jiesuan_fail'>去结算</view>
							 <view v-else class='jiesuan_ok'>去结算</view>
		      </view>
		
		    </view>
		
		  </view>
		
		  </view>
		  <view v-else class='no_data'  style="justify-content: center;display: flex;">
		    <image src="../../static/no_data.png" style="margin-top: 160rpx;width: 240rpx;height: 240rpx;"></image>
		  </view>

	</view>
</template>

<script>
	import {getCartDataFromLocal,addCounts,cutCounts} from "../utils/cart.js";
	export default {
		data() {
			return {
				sysData:{},
				selectedCounts:0,
				selectedTypeCounts:0,
				account:0,
				cartData:[],
				allStatus:false
			}
		},
		onLoad() {
			
		},
		onShow(){
			this.sysData = uni.getStorageSync('sysInfo');
			this.getCartData();
		},
		methods: {
			getCartData(){
				var cartData  = getCartDataFromLocal();
				this.cartData = cartData;
				this._calcTotalAccountAndCounts(cartData);	
				if(this.selectedTypeCounts == this.cartData.length){
					this.allStatus = true;
				}else{
					this.allStatus = false;
				}
			},
			_calcTotalAccountAndCounts(data) {
			    var len = data.length,
			      //所需计算的总价格,但是必须是选中的总价格
			      account = 0,
			      //购买商品的总个数
			      selectedCounts = 0,
			      //购买商品种类的总数
			      selectedTypeCounts = 0;
			    let multiple = 100;
			
			    for (let i = 0; i < len; i++) {
			      if (data[i].selectStatus) {
					if(data[i].type ==1){
						var sale_price = Number(data[i].active_price)
					}else{
						var sale_price = Number(data[i].sale_price)
					}
			        account += data[i].counts  * sale_price ;
			        selectedCounts += data[i].counts;
			        selectedTypeCounts++;
			      }
			    }
					
					this.selectedCounts     = selectedCounts;
					this.selectedTypeCounts = selectedTypeCounts;
					this.account            = account.toFixed(2);
					
			    return {
			      selectedCounts: selectedCounts,
			      selectedTypeCounts: selectedTypeCounts,
			      account: account.toFixed(2)
			    }
			
			},
			canToBuyClass(){
				if(this.account == 0){
					return "all-price-submit disabled";
				}else{
					return "all-price-submit";
				}
			},
			  //改变购物车的商品数量
			changeCounts(item,action,index) {
				var id = item.id,
				spec_id = item.spec_id,
				counts = 1;
		
				if (action == 'add') {
					if(item.counts+1 > item.stock){
						uni.showToast({
							title: '只剩库存'+item.stock+"个",
							duration: 1000,
							icon: 'false'
						})
						return false;
					}
					addCounts(id,spec_id);
				} else {
					if(item.counts-1 <=0){
						return false;
					}
					counts = -1;
					cutCounts(id,spec_id);
				}
				this.cartData[index].counts += counts;
				//重新计算
				this._calcTotalAccountAndCounts(this.cartData);
			},
		 //删除事件
			deleteItem(item,index) {
				var id = item.id;		
				this.cartData.splice(index, 1);
				//重新计算
				this._calcTotalAccountAndCounts(this.cartData);
				uni.setStorageSync('local_cart_key',this.cartData);
			},
			callMobile(){
				 var mobile = this.sysData.mobile;
					uni.makePhoneCall({
						phoneNumber:mobile
					})
			},
			toggleSelect(item,index) {
				var id = item.id,
					status =item.selectStatus;
		
				this.cartData[index].selectStatus = !status;
				//重新计算
				this._calcTotalAccountAndCounts(this.cartData);
		
			},
			  //全选文本事件
			  toggleSelectAll: function(event) {
			    //status代表选中的数量是否是购物车的数量即是否全选
			    this.allStatus = !this.allStatus;
			    var data = this.cartData,
			      len = data.length;
			    for (let i = 0; i < len; i++) {
			      data[i].selectStatus = this.allStatus;
			    }
			    this.cartData = data;
					//重新计算
					this._calcTotalAccountAndCounts(this.cartData);
			  },
				gotoProduct(id){
					uni.navigateTo({
						url:"../product/product?id="+id
					})
				},
			 submitOrder() {
				 if(this.account == 0){
					 return false;
				 }
					//判断是否 多少起送
					var start_money = this.sysData.start_money;
					var account = this.account;
					start_money = parseFloat(start_money);
					account     = parseFloat(account);
					// console.log(start_money);		console.log(account);return;
					if(start_money != 0){
						if(start_money>account){
							uni.showToast({
								title: "满"+start_money+"元起送哦",
								duration: 1000,
								icon: 'false'
							});
							return false;
						}
					}
					
					uni.setStorageSync('jiesuanFromKey',"cart|"+this.account);
					uni.navigateTo({
						url:'../jiesuan/jiesuan',
					})
				},
		}
	}
</script>

<style>
page{
    background: #F5F5F5;
}
.footer-account-box{
		position: fixed;
		bottom: 90rpx;
		height: 98rpx;
		width: 100%;
		display: flex;
		border-top: 1rpx solid #eeeeee;
		border-bottom: 1rpx solid #ccc;
}
.header{
    height: 85rpx;
    margin-top: 20rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
    background: #ffffff;
    border-top-left-radius: 26rpx;
    border-top-right-radius: 26rpx;
    display: flex;
    align-items: center;
    padding: 0rpx 30rpx;
}
.header > view:first-child{
    color: #0d0d0e;
    font-size: 32rpx;
}

.send_time{
    margin-left: 20rpx;
    margin-right: 20rpx;
    height: 42rpx;
    background-color: #fff;
    font-size: 24rpx;
    padding: 0rpx 30rpx;
    color: #454553;
	 overflow:hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow:ellipsis;
}
.cart-container{
    background-color: #fff;
    margin: 8rpx 20rpx 20rpx 20rpx;
    border-bottom-left-radius: 15rpx;
    border-bottom-right-radius: 15rpx;
}
.cart-box{
    overflow-x: hidden;
    margin-bottom: 92rpx;
    font-size: 28rpx;
}

.cart-item{
    display: flex;
    padding:20rpx;
    padding-left: 0;
    border-bottom:1rpx dashed #D0D0D7;
    height: 186rpx;
}
.cart-box .cart-item:last-child{
    margin-bottom: 0;
    border: none;
}

.cart-item>view{
    height: 100%;
}
.cart-item-main{
    width: 100%;
    display: flex;
}
.cart-item-checkbox{
    width: 84rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cart-item-checkbox image{
    height: 44rpx;
    width: 44rpx;
}
.cart-item-img{
    width:186rpx;
    height: 100%;
    background-color: #F5F6F5;
    border-radius: 4rpx;
}
.cart-item-img image{
    width: 100%;
    height: 100%;
}
.cart-item-counts .icon{
	 font-size: 44rpx;
	 color: #c1baba;
}
.delicon{
	font-size: 38rpx;
	color: #626060;
}
.cart-item-word{
    display: flex;
    flex: 1;
    flex-direction:column;
    justify-content:space-between;
    padding: 8rpx 0;
    margin:0 10rpx 0 20rpx;
    box-sizing: border-box;
    color: #454553;
}
.show_spec{
	font-size: 20rpx;
}
.title-box{
    display: flex;
    justify-content:space-between;
}
.bottom-box{
    font-size: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cart-item-counts{
    width:194rpx;
    display: flex;
    justify-content: space-between;
    text-align: center;
		align-items: center;
}
.cart-item-counts>view{
    display: flex;
    justify-content: center;
    align-items: center;
}
.cart-item-counts .btns{
    color: #454553;
    font-size: 50rpx;
    padding: 0 10rpx;
}
.cart-item-counts .btns.disabled{
    color: #D5D5DB;
}
.cart-item-counts .counts{
    color: #454553;
    font-size: 24rpx;
    box-sizing: border-box;
}
.delete{
    font-size: 40rpx;
    padding:0 10rpx;
}


/*合计*/
.all-accounts-box{
    background-color:#ffffff;
    color: #0d0d0e;
}
.all-accounts-box>view{
    display: flex;
    align-items: center;
}
.all-select{
    font-size: 28rpx;
    width: 40%;
}
.all-select image{
    height: 48rpx;
    width: 48rpx;
    margin:0 20rpx;
}

.all-price-submit{
    width: 60%;
}
.all-price-submit.disabled{
    color: #e6e6e6;
}
.accounts-btn,.price-text{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32rpx;
}
.accounts-btn{
    font-size: 32rpx;
    border-right: 3rpx dotted #fff;
    font-weight: bold;
}

.price-text{
    font-size: 32rpx;
    margin-left: 10rpx;
    color: #ff0000;
    font-weight: bold;
}
.arrow-icon{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 20rpx;
}
.jiesuan_ok{
    height: 68rpx;
    width: 195rpx;
    background: #ff0000;
    border-radius: 40rpx;
    color: #fff;
    font-size: 30rpx;
    text-align: center;
    line-height: 68rpx;
}
.jiesuan_fail{
    height: 68rpx;
    width: 195rpx;
    background: #ff0000;
    border-radius: 40rpx;
    color: #fff;
    font-size: 30rpx;
    text-align: center;
    line-height: 68rpx;
}
.arrow-icon image{
    height: 32rpx;
    width: 32rpx;
}
.no_data{
    text-align: center;
}
.no_data image{
    width: 300rpx;
    height: 300rpx;
    margin-top: 180rpx;
}
.tel{
    flex: 1;
}
.tel image{
    width: 40rpx;
    height: 40rpx;
    float: right;
}

</style>
