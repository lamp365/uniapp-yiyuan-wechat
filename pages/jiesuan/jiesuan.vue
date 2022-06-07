<template>
	<view>
		<!--订单详情-->
		<view class="showTips" v-if="showTipsStatus">提示：配送范围{{start_away}}公里</view>
		<view class="container order-container">
		  <!--订单编号和下单时间，如果是旧订单就显示-->
		  <view class="order-basic-info" v-if="basicInfo">
		    <view class="order-time-no">
		      <view>
		        <text class="key">下单时间：</text>
		        <text class="val">{{basicInfo.orderTime}}</text>
		      </view>
		      <view>
		        <text class="key">订单编号：</text>
		        <text class="order-no-txt val">{{basicInfo.orderNo}}</text>
		      </view>
		    </view>
		    <view class="order-status">
		      <text class="order-status-txt unpay" v-if="orderStatus==1">待付款</text>
		      <text class="order-status-txt payed" v-if="orderStatus==2">已付款</text>
		      <text class="order-status-txt done" v-if="orderStatus==3">已发货</text>
		    </view>
		  </view>
		
		  <!--地址-->
		  <view :class="[setOrderTypeClass()]"  v-if="selectAddressStatus == 1">
		    <view v-if="!isNoAddressData">
		      <view class="contact-box" @click="gotoAddressList()">
		        <view>
		          <view class="contact">
		            <view>
		              <text class="val">{{addressInfo.name}}</text>
		            </view>
		            <view class="mobile-box">
		              <text class="val">{{addressInfo.mobile}}</text>
		            </view>
		          </view>
		          <view class="detail">{{addressInfo.detail}}</view>
		        </view>
		        <view class="contact-icon">
		          <text class="icon-gengduo icon iconfont"></text>
		        </view>
		      </view>
		    </view>
		    <view v-else>
		      <view class="add-new-address"  @click="editAddress()">
		        <text class="icon">+</text>
		        <text>添加地址</text>
		      </view>
		    </view>
		  </view>
		
		  <!--列表-->
		  <view class="order-main">
		  
				<view class="product-item" v-for="(item,index) in productsArr" :key="index">
	
					<view class="item-left">
						<image :src="item.main_img_url"></image>
					</view>
	
					<view class="item-middle">
						<view>{{item.name}}</view>
						<view v-if="item.type ==1">￥{{item.active_price}}/件  共{{item.counts}}件</view>
						<view v-else>￥{{item.sale_price}}/件  共{{item.counts}}件</view>
						<view class="">规格：{{item.spec_name}}</view>
					</view>
	
					<view class="item-right">
						￥<text v-if="item.type ==1">{{item.active_heji}}</text><text v-else>{{item.sale_heji}}</text>	
					</view>
	
				</view>
		    
		
		    <!-- 支付金额信息 -->
		    <view class="pay_info">
					<view class="tit">商品总额</view><view class="money">￥{{account}}</view>
				</view>
		      <!-- <view class="pay_info">
		        <view class="tit">运费</view><view class="money">￥0.00</view>
		      </view> -->
		      <view class="pay_info">
		        <view class="tit">优惠券/活动</view><view class="money">￥{{coupon_money}}</view>
		      </view>
		      <view class="pay_info">
		        <view class="tit">合计</view><view class="he_money">￥{{last_account}}</view>
		      </view>
		
		      <view class="pay_info">
		        <view class="tit">订单留言</view>
		        <view class="liuyan">
		          <input type="text"  placeholder="请输入留言信息 >" class="liuyan_put" placeholder-class="liuyan_put_placeholder" v-model="msg_liuyan"/>
		        </view>
		      </view>
		  		
		      <view class="pay_info" v-if="start_away > 0">
		        <view class="tit">配送范围</view><view class="">{{start_away}}公里内免费配送</view>
		      </view>
		
		  </view>
		  <!--外卖还是店食-->
		  <view class='select-item-checkbox'>
		    <view class='select-item-detail' @click="selectPeisonType(1)" >
		      <image v-if="selectAddressStatus == 1" src='../../static/circle@selected.png'></image>
		      <image v-else src='../../static/circle@noselected.png'></image>
		      <text>配送</text>
		    </view>
		
		    <view class='select-item-detail' @click="selectPeisonType(2)" >
		      <image v-if="selectAddressStatus == 2" src='../../static/circle@selected.png'></image>
		      <image v-else src='../../static/circle@noselected.png'></image>
		      <text>自取</text>
		    </view>
		  </view>
		
		  <!--结算-->
		  <view class="footer-account-box order-accounts">
		    <view class="total-account">
		      付款合计：￥{{last_account}}
		    </view>
		    <!--因为屏蔽了支付系统，故第一次支付会不成功，但会生成订单，第二次付款支付不了-->
		    <!--订单状态为未付款，从购物车来的请求，第一次支付，满足这些才可以第一次生成订单     -->
		    <view v-if="orderStatus<=1  && firstPayStatus ==1" :class="[setOrderPayClass()]" @click="pay">
		      提交订单
		    </view>
		    
		    <view v-else class="pay disabled"  @click="pay">
		      立即支付
		    </view>
		  </view><!-- 结算end-->
				<fullLoading :loadModal="loadModal"></fullLoading>
		</view>
	</view>
</template>

<script>
	import {getCartDataFromLocal,deleteCart} from "../utils/cart.js";
	import {setAddressInfo} from "../utils/address.js";
	import {getOrderInfoById,oneMorePay} from "../api/orderApi.js";
	import {getUserOneCoupon,geOrderCoupon} from "../api/couponApi.js";
	import {getAddress} from "../api/addressApi.js";
	import {createOrder} from "../api/orderApi.js";
	import fullLoading from "../../components/loading/fullLoading.vue";
	export default {
		components:{
			fullLoading
		},
		data() {
			return {
				 //订单编号id，有则订单生成成功，没就失败
				    id: null,
				    //选择店食还是外卖，1外卖，2自取
				    selectAddressStatus: 1,
				    //第一次支付，可以生成订单，但是不能付款，之后都不能支付了
				    firstPayStatus:1,
				    //来源是哪里
				    fromUrl: null,
				
				    addressInfo:{},
				    isNoAddressData:true,
				
				    no_goods_sel:["其它商品继续购买(缺货商品退款) >","缺货时电话与我沟通 >"],
				    no_good_type: 0,
				    choseQuestionBank:"其它商品继续购买(缺货商品退款) >",
				    user_coupon_id:0,
				    coupon_money: '0.00',
				    last_account:'0.00',
				    msg_liuyan:'',
				    start_away:0,
				    showTipsStatus:false,
					sysInfo:{},
					jiesuanFrom:{},
					basicInfo:'',
					loadModal:false,
					productsArr:[],
					account:'0.00',
					orderStatus:0
			}
		},
		onLoad() {
			 
		},
		onShow(){
			this.sysInfo = uni.getStorageSync('sysInfo');
			this.showSendTips();
			this.jiesuanFrom = uni.getStorageSync('jiesuanFromKey');	
			this._initpage();
		},
		methods: {
			_initpage(){
				
				if(this.jiesuanFrom == '' || this.jiesuanFrom == undefined || this.jiesuanFrom == null){
					uni.showToast({
						title: "当前无结算订单！",
						duration: 1000,
						icon: 'false'
					});
						
					uni.navigateBack({
						delta:1
					})
					return false;
				}else{
					var jiesuanFrom = this.jiesuanFrom;
					jiesuanFrom = jiesuanFrom.split('|');
					console.log(jiesuanFrom,jiesuanFrom[0]);
					if(jiesuanFrom[0] == 'cart'){
						var account = jiesuanFrom[1];
						 this._fromCart(account);
						 this.getOrderOneCoupon();
						 this.getDefaultAddress(0);
					}else{
						var id = jiesuanFrom[1];
						this._fromOrder(id);
					}
				} 
			},
			_fromCart(account) {
			    var productsArr;
			    this.account = account;
			
			    productsArr = getCartDataFromLocal(true);
				this.productsArr    = productsArr;
				this.account       = account;
				this.orderStatus   = 0;
				this.last_account  = account;
					
			  },
			
			_fromOrder(id) {
				this.id = id;
				//下单后，支付成功或者失败，点击左上角返回时能够更新订单状态，所以放在onshow中
				var that = this;
				//访问服务器，根据订单id获取数据库中订单信息
				getOrderInfoById({id:id}).then(data => {
					console.log(data);
					this.orderStatus = data.orderStatus;
					this.productsArr  = data.productsArr;
					this.account      = data.account;
					this.last_account = data.account;
					this.selectAddressStatus = data.selectAddressStatus;
					this.basicInfo =  {
							orderTime: data.create_time,
							orderNo: data.order_no
						};
						
					this.firstPayStatus = 2;
					that.geOrderCouponFunc({order_id:id,user_coupon_id:data.user_coupon_id});
					that.getDefaultAddress(0);
				});
			},
			showSendTips:function(){
				if(this.sysInfo.start_away!=0){
					this.showTipsStatus = true;
				}
				this.start_away = this.sysInfo.start_away;
				var that = this;
				setTimeout(function(){
					that.showTipsStatus = false;
				},3000)
			},
			setOrderTypeClass(){
				if(this.orderStatus!=0){
					return "order-address-info disabled";
				}else{
					return "order-address-info";
				}
			},
			setOrderPayClass(){
				if(this.firstPayStatus != 1){
					return "pay disabled";
				}else{
					return "pay";
				}
			},
			getOrderOneCoupon(){
				getUserOneCoupon({account:this.account}).then(result => {
					 var last_account = this.account - result.money;
					 var coupon_money = result.money;
					coupon_money = parseFloat(coupon_money);
					last_account = parseFloat(last_account);
					 this.user_coupon_id= result.id;
					 this.coupon_money = coupon_money.toFixed(2);
					 this.last_account = last_account.toFixed(2);
				})
			},
			geOrderCouponFunc(parame){
				geOrderCoupon(parame).then(result => {
					 var last_account = this.account - result.money;
					 var coupon_money = result.money;
					coupon_money = parseFloat(coupon_money);
					last_account = parseFloat(last_account);
					 this.user_coupon_id= result.id;
					 this.coupon_money = coupon_money.toFixed(2);
					 this.last_account = last_account.toFixed(2);
				}).catch(err =>{
					console.log(err);
				})
			},
			selectPeisonType(type){
				if(type ==1){
					this.selectAddressStatus=1;
					//滚动到顶部
				}else{
					this.selectAddressStatus=2;
				}
			},
			getDefaultAddress(id){
				getAddress({id:id}).then(result => {
					 var isNoAddressData = true;
						if(Object.keys(result).length>0){
							isNoAddressData = false;
						}
						this.isNoAddressData = isNoAddressData;
						this.addressInfo = result;
				})
			},
			editAddress() {
			    //请用真机演示，效果地址操作还是很完美的
			   /* var that = this;
			    wx.chooseAddress({
			      success: function(res) {
			        var addressInfo = {
			          name: res.userName,
			          mobile: res.telNumber,
			          totalDetail: setAddressInfo(res)
			        }
			        that.addressInfo = addressInfo;
			
			        //保存地址（保存到数据库中）
			        submitAddress(res, (flag) => {
			          if (!flag) {
			            that.showTips('操作提示', '地址信息更新失败', true);
			          }
			        });
			      }
			    });
			    return '';  //可用以上方法或者注释上面，用下面的方法
			 */
			    var id = 0;
			    if(Object.keys(this.addressInfo).length >0 )
			       id = this.addressInfo.id;
			
					uni.navigateTo({
						url:'../myAddress/myAddress?id='+id,
					})
			  
			},
			gotoAddressList(){
				uni.navigateTo({
					url:"../myAddress/addressList"
				})
			},
			_showMessageToast(msg){
			  uni.showToast({
			  	title: msg,
			  	duration: 1500,
			  	icon: 'error'
			  })
			},
			pay(){
				 //判断地址信息是否填写
					if (this.selectAddressStatus == 1 && Object.keys(this.addressInfo).length <= 0) {
						this._showMessageToast('请填写你的收货地址');
						return;
					}
					//判断订单是否生成（购物车里的支付是还没生成订单，个人中心里面的历史订单是已经生成了订单）
					if (this.orderStatus == 0) {
						//第一次支付，先生成订单
						this._firstTimePay();
					} else {
						//不是第一次支付，已经存在订单直接支付
						this._oneMoresTimePay();
					}
			},
			_firstTimePay(){
				var that = this;
				//创建订单
				var wap_url = location.href.split("#")[0];
				var post_data = {},
				productInfo = this.productsArr;
				
				post_data.user_coupon_id = this.user_coupon_id;
				post_data.coupon_money   = this.coupon_money;
				post_data.totalPrice     = this.last_account;
				post_data.product_id     = productInfo[0].id;
				post_data.snap_img       = productInfo[0].main_img_url;
				post_data.snap_name      = productInfo[0].name;
				post_data.coupon_id      = this.coupon_id;
				post_data.mark_info      = this.msg_liuyan;
				post_data.select_status  = this.selectAddressStatus;
				post_data.address_id     = this.addressInfo.id;
				post_data.productInfo    = JSON.stringify(productInfo);
				post_data.wap_url        = wap_url;
				this.loadModal = true;
				createOrder(post_data).then(result => {
					this.loadModal = false;
					this.firstPayStatus = 2;
					this.id = result.order_id;
					//将已经下单的商品从购物车里删除
					this.deleteProducts();
					if(result.dev == 1){
						uni.showToast({
							title: '支付成功',
							duration: 2000,
							icon: 'success'
						});
						setTimeout(function(){
							//清空缓存记录来源
							uni.setStorageSync('jiesuanFromKey','');
							//开发测试
							uni.navigateTo({
								url:"../orders/orders"
							})
						},2000)
						
					}else{
						//更新缓存记录来源
						uni.setStorageSync('jiesuanFromKey',"order|"+result.order_id);
						this.$wxPay(result, function (res) {
						    /*成功的回调*/
						    uni.showToast({
						    	title: '支付成功',
						    	duration: 2000,
						    	icon: 'success'
						    });
							setTimeout(function(){
								//清空缓存记录来源
								uni.setStorageSync('jiesuanFromKey','');
								//开发测试
								uni.navigateTo({
									url:"../orders/orders"
								})
							},2000)
								
						}, function (e) {
						    /**失败的回调*/
						     uni.showToast({
						     	title: '支付失败了',
						     	duration: 2000,
						     	icon: 'error'
						     })
						})
					}
			
				}).catch(err => {
					this.loadModal = false;
					//刷新页面
					setTimeout(function(){
						location.reload();
					},1500)
					
				});
			},
			_oneMoresTimePay(){
				this.loadModal = true;
				var wap_url = location.href.split("#")[0];
				oneMorePay({id:this.id,wap_url:wap_url}).then(result=>{
					this.loadModal = false;
					this.$wxPay(result, function (res) {
					    /*成功的回调*/
					    uni.showToast({
					    	title: '支付成功',
					    	duration: 2000,
					    	icon: 'success'
					    });
							//清空缓存记录来源
							uni.setStorageSync('jiesuanFromKey','');
							uni.navigateTo({
								url:"../orders/orders"
							})
							
					}, function (e) {
					    /**失败的回调*/
					     uni.showToast({
					     	title: '支付失败了',
					     	duration: 2000,
					     	icon: 'error'
					     })
					})
				}).catch(error=>{
					this.loadModal = false;
				});
			},
			//将已经下单的商品从购物车中删除
			deleteProducts() {
				var arr = this.productsArr;
				for (let i = 0; i < arr.length; i++) {
					deleteCart(arr[i].id,arr[i].spec_id);
				}
			},
		}
	}
</script>

<style>
page{
	background:#f8f8f8;
}
.order-container{
    background-color: #f8f8f8;
    overflow-x: hidden;
    font-size: 28rpx;
}
.order-container>view{
    background-color: #fff;
}
.order-container .fullLoading{
	background-color: rgba(126,125,125,0.4);
}
.order-main{
    padding-bottom:50rpx;
}
.order-address-info,.order-basic-info{
    padding:20rpx 40rpx;
}

.order-basic-info{
    border-bottom: 1rpx solid #E9E9E9;
    display: flex;
}
.footer-account-box{
		position: fixed;
		bottom: 0rpx;
		height: 98rpx;
		width: 100%;
		display: flex;
		border-top: 1rpx solid #eeeeee;
}
.order-time-no{
    flex: 1;
}
.order-status{
    display: flex;
    flex-basis: 110rpx;
    align-items: center;
    justify-content: flex-end;
}
.order-time-no view:first-child{
   margin-bottom:15rpx ;
}
.order-time-no view .key{
    color: #555555;
}.order-time-no view .val{
    margin-left: 10rpx;
    color: #333;
}
.order-address-info{
    margin-bottom: 20rpx;
}

.add-new-address{
    width: 100%;
    height: 90rpx;
    font-size:28rpx;
    color:#989898;
    display: flex;
    align-items: center;
    justify-content: center;
}
.add-new-address .icon{
    /*font-size: 40rpx;*/
    color:#AB956D;
    margin-right: 10rpx;
}
.contact-box{
    display: flex;
}
.contact-box>view:first-child{
    flex: 1;
}
.contact-icon{
    flex-basis: 110rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.contact-icon .icon{
	font-size: 40rpx;
}
.contact-icon image{
    transform: rotate(270deg);
    height: 48rpx;
    width: 48rpx;
}
.contact{
    display: flex;
    margin-bottom: 16rpx;
		font-weight: 600;
}
.contact view:first-child{
	margin-right: 60rpx;
}
.contact view{
    display: flex;
    align-items: center;
}
.contact .mobile-box{
    flex-basis: 200rpx;
}
.contact image{
    height:32rpx;
    width:32rpx;
    margin-right: 10rpx;
}
.contact .val{
    color:#333;
}
.contact-box .detail{
    color:#555555;
}

/*订单三种状态*/
.order-status-txt{
    font-size: 30rpx;
    font-weight: bolder;
}
.order-status-txt .unpay{
    color: #B42F2D;
}
.order-status-txt .payed{
    color: #AB956D;
}
.order-status-txt .done{
    color: #57AB53;
}

.product-item{
    display: flex;
    justify-content: space-around;
    height:180rpx;
    color: #6D6D6D;
    border-bottom: 1rpx dashed #E9E9E9;
    padding:20rpx;
}
.product-item .item-left{
    flex-basis: 180rpx;
    height: 100%;
    background-color: #F5F6F5;
    border-radius: 4rpx;
}
.product-item .item-left image{
    height: 100%;
    width: 100%;
}
.product-item .item-middle{
    flex: 1;
    margin-left: 20rpx;
}
.product-item .item-middle view{
    margin: 15rpx 0;
}
.product-item .item-right{
    flex-basis: 80rpx;
    text-align: center;
	padding-top: 18rpx;
}

.order-accounts{
    background-color: #fff;
}
.order-accounts>view{
    display: flex;
    align-items: center;
}
.total-account{
    flex: 1;
    color:#ff0000;
    padding-right: 20rpx;
    font-weight: bold;
    flex-direction: row-reverse; 
    font-size: 30rpx;
}
.pay{ 
    flex-basis: 280rpx;
    background-color: #ffD306;
    color: #fff;
    justify-content: center;
    font-weight: bolder;
    font-size: 32rpx;
    margin-right: 16rpx;
    border-radius: 80rpx;
    margin-top: 8rpx;
    height: 86rpx;
}
.pay:active{
    background: #84704d;
}
.pay.disabled{
    pointer-events: auto;
}

.pay_info{
    padding: 0rpx 20rpx;
    height: 55rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26rpx;
    color:#6D6D6D;
}
.pay_info .money{
    font-weight: bolder;
}
.pay_info .he_money{
    font-weight: bolder;
    color: #ff0000;
}
.pay_info .liuyan{
    flex: 1;
}
.liuyan_put_placeholder,.liuyan_put{
    text-align: right;
		font-size: 24rpx;
}
.select-item-checkbox{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 160rpx;
    padding-bottom: 40rpx;
}
.select-item-detail {
    margin-right: 40rpx;
}

.select-item-checkbox image{
    height: 44rpx;
    width: 44rpx;
}
.showTips{
    position: fixed;
    top: 16rpx;
    left: 16rpx;
   padding: 8rpx 16rpx;
    background:rgb(12, 1, 1); 
    opacity:0.2; 
    border-radius: 14rpx;
    z-index: 888;
    font-size: 24rpx;
    color: #fff;
}
</style>
