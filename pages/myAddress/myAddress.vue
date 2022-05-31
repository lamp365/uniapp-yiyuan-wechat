<template>
	<view>
		<view class="redact-address">
		  <view class="possess-layout">
		    <view class="mains">
		      <view class="address-msg">
		        <view class="item-msg">收货人</view>
		        <view class="section">
		          <input type="text" placeholder="请填写收货人姓名" :value="consigneeName" v-model="consigneeName" placeholder-class="phcolor"></input>
		        </view>
		      </view>
		      <view class="address-msg">
		        <view class="item-msg">手机号码</view>
		        <view class="section">
		          <input type="number" placeholder="请填写收货人手机号码" :value="phone" maxlength="11" v-model="phone"  placeholder-class="phcolor"></input>
		        </view>
		      </view>
		      <view class="address-msg">
		        <view class="item-msg">所在地区</view>
		        <view class="section" @click='selectCity'>
		          <input disabled="disabled" placeholder="省市区县、乡镇等" :value="cityText"  placeholder-class="phcolor"></input>
		        </view>
		       
		      </view>
		      <view class="address-msg">
		        <view class="item-msg">详细地址</view>
		        <view class="section">
		          <input type="text" placeholder="街道、楼牌号等" :value="detailedAddress" v-model="detailedAddress" placeholder-class="phcolor"></input>
		        </view>
		      </view>
		      <view class="label">
		        <view class="label-title">标签</view>
		        <view class="label-list">
		          <view v-for="(item,index) in labelList" :key="index">
		            <view v-if="chooseLabelIndex == index" class="labels labels-active"  @click="chooseLabelSelect(index)">{{item}}</view>
					<view v-else class="labels"  @click="chooseLabelSelect(index)">{{item}}</view>
		          </view>
		        </view>
		      </view>
		      <view class="default-setting">
		        <view class="defaul-setting-left">
		          <view>设置默认地址</view>
		          <view>提醒：每次下单会默认推荐使用该地址</view>
		        </view>
				<view class="addressDefault" @click="setDefault()">
					<image v-if="isDafault" class='title-icon' src='../../static/circle@selected.png'></image>
					<image v-else class='title-icon' src='../../static/circle@noselected.png'></image>
				</view>	
		      </view>
		    </view>
		  </view>
		</view>
		
		<view class="goback">
			<text class="icon-back icon iconfont" @click="gotoBack()"></text>
		</view>
		<view class="btn" @click="submitAddress()">保存</view>
		    
		
		<view v-if="!isCity" class="selector">
		        <view class="inner_box">
		            <view class="header_box">
		                <view class="item l"  @click="ideChoice('cancel','city')">取消</view>
		                <view class="item c">  </view>
		                <view class="item r"  @click="ideChoice('confirm','city')">确定</view>
		            </view>
		 
		            <picker-view class="picker_box" indicator-class="selected" @change="cityChange" :value="cityValue">
		                <picker-view-column>
		                    <view v-for="(item,index) in provinces" :key="index">{{item.name}}</view>
		                </picker-view-column>
		                <picker-view-column>
		                    <view v-for="(item,index) in citys" :key="index">{{item.name}}</view>
		                </picker-view-column>
		                <picker-view-column>
		                    <view v-for="(item,index) in countys" :key="index">{{item.name}}</view>
		                </picker-view-column>
		            </picker-view>
		        </view>
		        <view class="layer"></view>
		    </view>	
	</view>
</template>

<script>
    import {getCityData} from "../utils/city.js";
	import {getAddress,createAddress} from "../api/addressApi.js";
	 /**
	    * 控件当前显示的数据
	    * provinces:所有省份
	    * citys 选择省对应的所有市,
	    * areas 选择市对应的所有区
	    * consigneeRegion：点击确定时选择的省市县结果
	    * animationAddressMenu：动画
	    * addressMenuIsShow：是否可见
	    */
	export default {
		data() {
			return {
				id:0,
				consigneeName: "", 
				phone: "",
				consigneeRegion: "",
				detailedAddress: "",
				labelList: ["家", "公司", "学校"],            //标签
				chooseLabelIndex: 0,              // 标签默认,
				isDafault:true,
			
			    cityData_new:[],
				// 所有的 省市区 集合  
				result_province:[],
				result_city:[],
				result_county:[],
				province_s: [],
				city_s: [], // “市区”集合
				county_s: [],// “县区”集合
				
				provinceName:'', // 选择省区 -名字
				province_id: '', // 选择省区 -id
				
				cityName: '', // 选择市区 - 名字
				city_id: '', // 选择省区 -id
				
				countyName: '', // 选择县区 -名字
				county_id: '', // 选择省区 -id
				
				
				 // 城市数据
				 provinces:'',
				 citys:'',
				 countys: '',
				 cityValue: [0, 0, 0],
				 cityText: '',
				 cityCode: '',
				 isCity: true, // 是否选择弹出 选择城市
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
					title: option.id != 0 ? '修改地址' : '添加地址'
			})
			this.id = option.id;
			if(option.id != 0){
				this.getUserAddress();
			}
			
			var cityData_all = getCityData();
			this.cityData_new = cityData_all.RECORDS;
			this.result_province = this.cityData_new.filter(
			  function (value) {
			    return (value.level_type == 1);
			  }
			);
			this.province_s = this.result_province;
			
			this.result_city = this.cityData_new.filter(
			  function (value) {
			    return (value.level_type == 2);
			  }
			);
			this.result_county = this.cityData_new.filter(
			  function (value) {
			    return (value.level_type == 3);
			  }
			);
			 //城市
			// 获取第一列元素 -- 北京
			var city_s = this.selectResultAction(this.result_city, 110000);//130000
			// console.log(result_city);console.log(city_s);
			var county_s = this.selectResultAction(this.result_county, 110100); //130100    秀屿区或者县区
			  //  console.log(result_county);console.log(county_s);
		    this.provinces = this.province_s;
			this.citys     = city_s;
			this.countys   = county_s;
		},
		methods: {
			getUserAddress() {
				getAddress({id:this.id}).then(addressInfo => {
					 var addres_name = addressInfo.province+'-'+addressInfo.city+'-'+addressInfo.country;
					 this.consigneeName    = addressInfo.name;
					 this.phone            = addressInfo.mobile;
					 this.consigneeRegion  = addres_name;
				     this.detailedAddress  = addressInfo.detail;
				});
			},
			selectCity(){
				this.isCity = false;
			},
			selectResultAction(data, event) {
				var result = data.filter(
				  function (value) {
					return (value.parent_id == event);
				  }
				);
				return result;
		  },
		  chooseLabelSelect(index){
			  this.chooseLabelIndex = index;
		  },
		  //取消后者确定选择
		  ideChoice: function (act,mold) {
			  var that = this;
				  
			  //城市
			  if (act == 'confirm' && mold == 'city') {
		  
				var t = this.cityValue; // 原本的位置 
		  
				// 记录当前选择的省市区ID  
				this.province_id = this.province_s[t[0]].id;
				this.city_id     = this.city_s[t[1]].id;
				this.county_id   = this.county_s[t[2]].id;
			  
			  // 记录当前选择的省市区名称
				this.provinceName = this.province_s[t[0]].name;
				this.cityName = this.city_s[t[1]].name;
				this.countyName = this.county_s[t[2]].name;
		  
				this.cityText = this.provinceName + ' - ' + this.cityName + ' - ' + this.countyName;
				this.cityCode = this.province_id + ' - ' + this.city_id + ' - ' + this.county_id;
			  }
			 
			 this.isCity = true;
		  },
		  setDefault(){
			this.isDafault = !this.isDafault;  
		  },
		  //城市选择器
		  cityChange: function (e) {
			var val = e.detail.value; // 改变的picker 每一列对应的下标位置
			var t = this.cityValue; // 原本的位置 
			if (val[0] != t[0]) { // 第一列改变
			  this.city_s = [];
			  this.county_s = [];
			  var current_id = this.province_s[val[0]].id;
			  this.city_s = this.selectResultAction(this.result_city, current_id);
			
			  var current_city_id = this.city_s[0].id;
			  this.county_s = this.selectResultAction(this.result_county, current_city_id);
			  this.cityValue = [val[0], 0, 0];
			  
			  this.citys   = this.city_s;
			  this.countys = this.county_s;
			  return;
			}
			if (val[1] != t[1]) {// 第二列改变
			  this.county_s = [];
			  var current_city_id = this.city_s[val[1]].id;
			  this.county_s = this.selectResultAction(this.result_county, current_city_id);
			  this.cityValue = [val[0], val[1], 0];
			  
			  this.countys = this.county_s;
			  return;
			}
			if (val[2] != t[2]) {// 第三列改变
			  this.county = this.countys[val[2]];
			  this.cityValue = val;
			  return;
			}
		  },
		  submitAddress(){
			  var formData = {};
			  formData.name = this.consigneeName;
			  formData.mobile = this.phone;
			  formData.province = this.provinceName;
			  formData.city = this.cityName;
			  formData.country = this.countyName;
			  formData.detail = this.detailedAddress;
			  formData.is_default = this.isDafault;
			  formData.chooseLabelIndex = this.chooseLabelIndex;
		  
			  var consigneeRegion = this.cityText;
			  if (formData.name == "") {
				this._showMessageToast('请输入姓名');
				return false;
			  }
			  if (formData.mobile == "") {
				this._showMessageToast('请输入手机号码');
				return false;
			  }
			   if (consigneeRegion == "") {
				this._showMessageToast('请选择所在地区');
				return false;
			  }
			   if (formData.detail == "") {
				this._showMessageToast('请输入详细地址');
				return false;
			  }
			  createAddress(formData).then(res => {
				  uni.showToast({
				  	title: res.msg,
				  	duration: 1500,
				  	icon: 'success'
				  })
			
				  setTimeout(function(){
					  uni.navigateBack({
						delta:1
					  })
				  },1500)
				 
			  })
		  },
		  _showMessageToast(msg){
			  uni.showToast({
			  	title: msg,
			  	duration: 1500,
			  	icon: 'error'
			  })
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
.redact-address {
  background: white;
  margin-bottom: 20rpx;
}
 
.address-msg {
  height: 128rpx;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border-top: 2rpx solid #efefef;
  font-size: 28.68rpx;
  color: #333333;
  padding: 0 20rpx;
}
.address-right image {
  width: 32rpx;
  height: 32rpx;
}
.address-rights {
  display: flex;
  align-items: center;
}
.address-rights image {
  width: 26rpx;
  height: 32rpx;
  margin-right: 13rpx;
}
.address-rights view {
  font-size: 28.68rpx;
}
.address-msg:last-child {
  border-bottom: none;
}
 
.section {
  width: 68%;
}
.phcolor {
  color: #999999;
  font-size: 30rpx;
}
.item-msg {
  width: 25%;
  margin-right: 25rpx;
}
 
.img {
  width: 35rpx;
  height: 35rpx;
  align-self: center;
}
 
.address-right {
  width: 100rpx;
  display: flex;
  flex-direction: row-reverse;
}
 
/* 标签 */
.label {
  display: flex;
  height: 128rpx;
  align-items: center;
  margin-top: 73rpx;
  border-top: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
  padding: 0 20rpx;
}
.label-title {
  font-size: 28.68rpx;
  color: #333333;
  margin-right: 83rpx;
}
.label .label-list {
  display: flex;
}
.label .label-list .labels{
  height: 40rpx;
  width: 96rpx;
  border: 1px solid #EEEEEE;
  margin-right: 37rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
  color: #000000;
  border-radius: 20rpx;
}
.labels-active {
  background: #F73C41 !important;
  color: #FFFFFF !important;
}
/* 默认设置 */
.default-setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160rpx;
  padding: 0 20rpx;
}
.defaul-setting-left view:nth-child(1){
  font-size: 28.68rpx;
  color: #333333;
  margin-bottom: 25rpx;
}
.defaul-setting-left view:nth-child(2) {
  font-size: 20rpx;
  color: #333333;
}
.defaul-setting-right {
  height: 64rpx;
  width: 105rpx;
}
 
.btn {
  width: 680rpx;
  height: 88rpx;
  background: #F73C41;
  color: #FFFFFF;
  position: fixed;
  bottom: 55rpx;
  left: 35rpx;
  border-radius: 41.5rpx;
  font-size: 36rpx;
  text-align: center;
  line-height: 88rpx;
}
 .addressDefault image{
	 height: 40rpx;
	 width: 40rpx;
 }
 .goback .icon{
	 font-size:80rpx;
	 position: fixed;
	 bottom: 220rpx;
	 right: 36rpx;
	 color: #F73C41;
 }
/*选择器*/
.selector{ width: 100%; position: fixed; bottom: 0; left: 0; z-index: 999999}
.selector .inner_box{ position: relative; z-index: 999999}
.selector .header_box{ padding: 25rpx 0; overflow: hidden; box-sizing: border-box; background: white;}
.selector .header_box .item{ float: left; font-size: 34rpx; color: black; box-sizing: border-box;}
.selector .header_box .l{ width: 50%; padding-left: 25rpx;}
/*.selector .header_box .c{ width: 50%; text-align: center}*/
.selector .header_box .r{ width: 50%; text-align: right; padding-right: 25rpx;}
.selector .selected{ height: 90rpx;}
.selector .picker_box{ width: 100%; height: 485rpx; background: #fff;}
.selector .picker_box picker-view-column{ text-align: center;}
.selector .picker_box picker-view-column view{ line-height: 90rpx;}



.selector .layer{ width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: 10; background:rgba(0,0,0,0.5); }


</style>
