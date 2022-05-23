<template>
	<view>
		<view class="top_main">
			<view class="search_input" @click="gotoSearch()">
				<image src="../../static/search.png"></image>
				请输入搜索名称
			</view>
			<view class="ling_xian"></view>
			<view class="tuijian_box">
				 <scroll-view scroll-x  scroll-left="scrollleft" class="box_scroll_view">
					 <view class="the_item" v-for="(item,index) in categoryTypeArr" :key="index" @click="changeCategoryFirst(item.id,index)">
						 <view>
							 <image :src="item.image"></image>
						 </view>
						 <view class="info_item" v-if="parentCurrentMenuIndex == index"><text class="active">{{item.name}}</text></view>
						 <view class="info_item" v-else>{{item.name}}</view>
					 </view>
				 </scroll-view>
			</view>
		</view>
		<!-- 下半部 -->
		
		<view class="mian-box">
		  <view class='category-box'>
		    <view class="left-box" style="position: fixed;top:308rpx;">
		     
					<view :class="[secendCateClass(index)]" v-for="(item,index) in secondCategory" :key="index" @click="changeCategory(item.id,index,item.parent_id)">
						{{item.name}}
					</view>
		 
		      <view style="height: 60rpx;"></view>    
		    </view>  <!--左侧nav-->
		      
		    <view style="width: 150rpx;height: 100%;"></view>
		     
		    <view class='right-box'>
		      <view class='foods-type-box'>
						<view class="category-detail-box">
							
						   <view  v-if="categoryProducts.length>0">
						     <view class="product_list"  v-for="(item,index) in categoryProducts" :key="index" @click="gotoProduct(item.id)">
						       <image :src="item.main_img_url" class="product_img" mode='aspectFill'></image>
						       <view class="product_content">
						         <view class="product_title">{{item.name}}</view>							
						         <view class="">
											 <view  v-if="is_show_sale_num == 1" class="has_sale">已售 {{item.seller_num+item.virtual_num}}</view>
											 
											  <view  v-if="item.type !=0" class="huaxian_price">¥{{item.sale_price}}</view>
												
												<view class="product_buy">
													<view v-if="item.type ==0">¥{{item.sale_price}}</view>
													<view v-else>¥{{item.active_price}} <text class="icon">新人价</text></view>
																				
													<view @click.stop="chooseSpec(item.id)"><image src="../../static/add.png"></image></view>
												</view>
						            
						         </view>
						       </view>
						     </view>
						   </view>
							 
						   <view class="no_data"  v-if="is_nodata" style="justify-content: center;display: flex;">
						     <image src="../../static/no_data.png" style="margin-top: 48rpx;width: 240rpx;height: 240rpx;"></image>
						   </view>
							 
						 </view> 
		      </view>
					<!-- foods-type-box -->
		    </view> 
		      
		       
		      <!--右侧内容-->
		    
		  </view> <!--category-box-->
		
		</view>
		<!-- mian box -->
		
		<!-- 普通弹窗 选择规格 -->
		<view>
			<uni-popup ref="specpopup" background-color="#fff" @change="change">
				<view class="popup-content specpopup">
					<view class="show_info">
						<view class="main_pic"><image src="https://demo26.crmeb.net/uploads/attach/2021/11/15/08ba709edfd9d1cc5505f69bd53e679b.jpg" mode=""></image></view>
						<view class="show_price">
							<view class="tit">新人价</view>
							<view class="money">￥<text class="sale_price">29.9</text> <text class="huaxian_price">￥16.58</text></view>
							<view class="choose_spec">已选：1件750ml <text class="kucun">库存：16件</text></view>
						</view>
					</view>
					<view class="spec_list">
						<view class="spec_title">规格</view>
						<view class="spec_show_box">
							<view class="one_spec">一件360ML</view>
							<view class="one_spec">一件360ML75du</view>
							<view class="one_spec has_choose">一件360ML</view>
							<view class="one_spec">一件360ML</view>
							<view class="one_spec">一件360ML</view>
						</view>
					</view>
					<view class="set_nums">
						<view class="set_nums_title">数量</view>
						<view class="nums_buttom">
							<text class="iconfont icon-jianshao icon"></text>
							<text class="show_geshu">8</text>
							<text class="iconfont icon-zengjia icon"></text>
						</view>
					</view>
					<view style="height: 250rpx;"></view>
				</view>
			</uni-popup>
		</view>  
		<!-- 弹窗end -->
	</view>
</template>

<script>
	import {getCategoryType,getProductsByCategory} from "../api/categoryApi.js";
	export default {
		data() {
			return {
				 categoryTypeArr: [],
					categoryProducts: [],
					currentMenuIndex: 0,
					parentCurrentMenuIndex: 0,
					loadedData: {},
			
					secondCategory: [],
			
					is_nodata:false,  
					categoryBoxTop:308,
					is_show_sale_num:0,
					current_page:1
			}
		},
		onLoad: function(options) {
		    this._loadData();
		},
		methods: {
			_loadData: function() {
			    var that = this;
					getCategoryType().then(categoryData => {
						  var secondCategory = [];
						  var category_id = 0;
						  if(categoryData[0].sonCate.length >0){
						    secondCategory = categoryData[0].sonCate;
						    category_id = categoryData[0].sonCate[0].id
						  }
						  console.log(categoryData);
							that.categoryTypeArr = categoryData;
							that.secondCategory = secondCategory;
			
									
						  //一定要在回调里再进行获取分类详情的方法调用
						  // var parame_data = {id:category_id,page:that.data.current_page}
							getProductsByCategory({id:category_id}).then(data => {
								if(data.length > 0){
									var is_nodata = false;
								
								}else{
									var is_nodata = true;
								
								}
								
								that.categoryProducts = data;
								that.is_nodata = is_nodata;
								//第一次加载保存到loadedData中
								var index_key = "cate_"+category_id+"_0";
								that.loadedData[index_key] = data;
							});
						})
			},
			 changeCategoryFirst:function(category_id,index){
			    var categoryData = this.categoryTypeArr;
			    for(var i=0;i<categoryData.length;i++){

			      if(category_id == categoryData[i].id){
							this.secondCategory = categoryData[i].sonCate;
							this.parentCurrentMenuIndex = index;
							this.currentMenuIndex = 0;
			     
			        //如果有soncat 请求第一个
			        if(categoryData[i].sonCate.length > 0){
			          var sonCate = categoryData[i].sonCate;
			          var id = sonCate[0].id;
			          var index_key = "cate_"+category_id+"_0";
			          this.changeGetDataFunc(index_key,id);
			        }else{
			          //没有子分类
								this.categoryProducts = {};
								this.is_nodata = true;
			        }
			      }
			    }
			  },
			  changeCategory: function(id,index,parentid) {
					this.currentMenuIndex = index;
					 var index_key = "cate_"+parentid+"_"+index;
			    this.changeGetDataFunc(index_key,id);
			  },
			
			  changeGetDataFunc:function(index_key,id){
			    //内容回滚顶部
			    wx.pageScrollTo({
			      scrollTop: 0
			    });
					var that = this;
			    if (!this.isLoadedData(index_key)) {
			      //如果没有加载过当前分类的商品数据
						getProductsByCategory({id:id}).then(data =>{
							if(data.length>0){
								 var is_nodata = false;
							}else{
								var is_nodata = true;
							}
							
							// console.log(Object.keys(dataObj).length);
							that.categoryProducts = data;
							that.is_nodata = is_nodata
							//第一次加载保存到loadedData中
							that.loadedData[index_key] = data;
						});
			    } else {
			      //不是第一次加载就使用loadedData
			      var getData = this.loadedData[index_key];
			      var is_nodata = false;
			      if(getData.length == 0)
			          is_nodata = true;
								
						this.categoryProducts = getData;
						this.is_nodata = is_nodata;
			    }
			  },
				//判断当前分类下的商品数据是否已经被加载过
				isLoadedData: function(index_key) {
						console.log(this.loadedData);
					if (this.loadedData[index_key]) {
						return true;
					}
					return false;
				},
				gotoSearch(){
					uni.navigateTo({
						url:"../search/search"
					})
				},
			   secendCateClass(index){
					 if(this.currentMenuIndex == index){
						 return "menu-item selected";
					 }else{
						 return "menu-item";
					 }
				 },
				 stopMaopao(){
					 console.log(2);
					return false; 
				 },
				 gotoProduct(id){
					 uni.navigateTo({
					 	url:"../product/product?id="+id
					 })
				 },
				 chooseSpec(id){
				 	var type = 'bottom';
				 	// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				 	this.$refs.specpopup.open(type);
				 },
				 change(e) {
				 	console.log('当前模式：' + e.type + ',状态：' + e.show);
				 },
		},
		  //滚动到底部加载更多
		  onReachBottom:function() {
		    console.log(22);
		  },
	}
</script>

<style>
	@import url("../../static/iconfont.css");
	page{
		background: #f8f8f8;
	}
	.top_main{
		background: #fff;
		overflow: hidden;
	}
.search_input{
    display: flex;
    height: 66rpx;
    background: #F5F5F5;
    color: #999;
    font-size: 14px;
    flex: 1;
    z-index: 99;
    margin: 20rpx 0;
    border-radius: 44rpx;
    align-items: center;
		width: 88%;
		margin-left: 6%;
}
.search_input image{
	height: 34rpx;
	width: 34rpx;
	margin-right: 16rpx;
	margin-left: 28rpx;
}
.ling_xian {
    height: 10rpx;
    background: #F5F5F5;
    margin-top: 24rpx;
}
.tuijian_box {
    padding: 20rpx 20rpx 6rpx 20rpx;
    margin-top: 8rpx;
}
.tuijian_box .box_scroll_view {
   white-space: nowrap;
	width: 100%;
	display: flex;
	flex-direction: row;
	height: 180rpx;
}
.tuijian_box .the_item {
    width: 122rpx;
    height: 180rpx;
    display: inline-block;
    margin-right: 34rpx;
    box-sizing: border-box;
    overflow: hidden;
		text-align: center;
}
.tuijian_box .the_item image {
    width: 116rpx;
    height: 120rpx;
    border-radius: 50%;
}
.tuijian_box .info_item {
    font-size: 24rpx;
    white-space: nowrap;
    overflow: hidden;
		color: #646363;
}
.tuijian_box .the_item .active{
		background: #10d3c2;
		color: #fff;
		padding: 0 16rpx;
		border-radius: 12rpx;
}

/* 下半部 */
.mian-box{
	height: 100%;
}
.category-box {
    display: flex;
    height: 100%;
}
.left-box {
    flex: 0 0 150rpx;
    /* border-right: 1rpx solid #D8D8D8; */
    width: 150rpx;
    background-color: #fff;
    height: 100%;
}
.right-box {
    flex: 1;
    transition: all 500ms ease-in-out;
}
.menu-item {
    height: 50rpx;
   margin: 16rpx 0rpx 10rpx 0rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    border-left: 6rpx solid #fff;
}
.menu-item.selected {
    color: #10d3c2;
    border-left-color: #10d3c2;
}
.foods-type-box {
    height: 100%;
}
/* produxt */
.category-detail-box{
    overflow: hidden;
    padding: 0rpx 20rpx 24rpx 20rpx;
		background: #f8f8f8;
}
.product_list{
    height: 180rpx;
    display: flex;
    margin-top:20rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 16rpx 20rpx;
}
.product_list>image{
    height: 180rpx;
    width: 180rpx;
    border-radius: 30rpx;
}
.product_content>view:nth-child(1){
    font-size: 28rpx;
    font-weight: 500;
    height: 80rpx;
}
.product_content>view:nth-child(3){
    font-size: 28rpx;
    color: red;
    margin-top: 20rpx;
}
.product_content>view:nth-child(2){
    font-size: 28rpx;
    color: #f94a3b;
		margin-bottom: 0rpx;
}

.product_content{
    margin-left: 12rpx;
    flex: 1;
		justify-content: space-between;
		flex-flow: column;
		display: flex;
		 font-size: 28rpx;
}
.product_content .has_sale{
	color: #bdbbbb;
}
.product_content .huaxian_price{
	color: #bdbbbb;
	text-decoration: line-through;
}
.product_content .icon{
	margin-left: 8rpx;
	padding: 0 8rpx;
	font-size: 18rpx;
	background: #f94a3b;
	color: #fff;
	border-radius: 8px;
}
.product_buy{
    display: flex;
    justify-content: space-between;
}
.product_buy image{
   /* color: #fff;
   padding: 4rpx 22rpx;
   background: #f68e35;
   border-radius: 20rpx; */
   width: 38rpx;
   height: 38rpx;
}
.category-header{
    height: 200rpx;
    text-align: center;
}
.category-header image{
    border-radius: 5rpx;
    width: 520rpx;
    max-height: 100%;
}
.category-title{
    margin: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.category-title text{
    font-size: 24rpx;
    color:#AB956D;
}
.category-title text::before,.category-title text::after{
    content: '';
    display: inline-block;
    position: relative;
    top: -6rpx;
    width: 70rpx;
    height: 2rpx;
    margin: 0 20rpx;
    background-color:#979797;
}
.category-main{
    display: flex;
    flex-wrap: wrap;
}
.category-goods-items{
    width: 30%;
    margin-bottom: 20rpx;
    text-align: center;
}
.category-goods-items.middle{
    margin:0 20rpx;
}
.category-goods-items image{
    height: 120rpx;
    width: 120rpx;
    border-radius: 120rpx;
}
.category-goods-items view {
    color:#444452;
    font-size: 24rpx;

}
/* 理解购买 显示规格 */
.specpopup .show_info{
	display: flex;
	background: #fff;
	padding: 38rpx 20rpx;
}
.specpopup .show_info image{
	width: 150rpx;
	height: 150rpx;
	border-radius: 16rpx;
}
.specpopup .show_info .show_price{
	font-size: 24rpx;
	color: #999;
	margin-left: 30rpx;
}
.specpopup .show_info .show_price .tit{
	color:  #f94a3b;
}
.specpopup .show_info .show_price .money{
	margin-top: 10rpx;
	color:  #f94a3b;
	font-weight: 600;
}
.specpopup .show_info .show_price .sale_price{
	font-size: 44rpx;
	
}
.specpopup .show_info .show_price .huaxian_price{
	color: #999;
	text-decoration: line-through;
	margin-left: 24rpx;
	font-weight: normal;
}
.specpopup .show_info .show_price .choose_spec{
	margin-top: 16rpx;
}
.specpopup .show_info .show_price .kucun{
	margin-left: 30rpx;
}
.specpopup .spec_list{
	    padding: 0px 22rpx;
}
.specpopup .spec_list .spec_title{
	color: #999;
}
.specpopup  .spec_show_box{
	margin-bottom: 24rpx;
}
.specpopup  .spec_show_box .one_spec{
	border: 2rpx solid #f2f2f2;
	font-size: 26rpx;
	color: #282828;
	padding: 10rpx 32rpx;
	border-radius: 24rpx;
	margin: 20rpx 20rpx 0rpx 0rpx;
	background-color: #f2f2f2;
	display: inline-block;
	font-size: 24rpx;
}
.specpopup  .spec_show_box .has_choose{
	border: 2rpx solid  #10d3c2;
	color:  #10d3c2;
}
.specpopup .set_nums{
	 padding: 0px 22rpx;
	 display: flex;
	 justify-content: space-between;
	 align-items: center;
}
.specpopup .set_nums .set_nums_title{
	color: #999;
}
.specpopup .set_nums .nums_buttom{
	display: flex;
	align-items: center;
	color: #666;
}
.specpopup .set_nums .show_geshu{
	padding: 0rpx 16rpx;
}
.specpopup .set_nums .icon{
	font-size: 40rpx;
	color: #c1baba;
}
</style>
