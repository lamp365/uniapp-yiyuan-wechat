<template>
	<view class="main_box">
		<view class="header">
			<view class="face"><image src="../../static/default_header.png" mode=""></image></view>
			<view class="right">
				<view class="name">kevin.liu</view>
				<view class="money">
					<view>可提现<text class="mm">2510</text></view>
					<view class="tixian"><image src="../../static/tixian.png" mode=""></image></view>
				</view>
			</view>
		</view>
		
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view class="content">
			
	
			<view class="show_time">
				<view class="example-body time_put">
					<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick"  :border="false"/>
				</view>
				<view class="search">查询</view>
			</view>
			
					
			<view v-if="current === 0">
				<view class="c_tit">总充值2500，总收入120</view>
				<!-- <uni-table  emptyText="暂无更多数据" style="width: 100%;">
		
					<uni-tr>
						<uni-th align="left" width="140">昵称</uni-th>
						<uni-th align="left" width="100">总充值</uni-th>
						<uni-th align="left">总收入</uni-th>
					</uni-tr>
			
					<uni-tr>
						<uni-td>小明名23154接口sad的是覅固定萨芬</uni-td>
						<uni-td>Jeson</uni-td>
						<uni-td>15.2</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td>小明名</uni-td>
						<uni-td>HanMeiMei</uni-td>
						<uni-td>15.23</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td>小明名</uni-td>
						<uni-td>LiLei</uni-td>
						<uni-td>15.23</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td>小明名</uni-td>
						<uni-td>Danner</uni-td>
						<uni-td>15.23</uni-td>
					</uni-tr>
				
				</uni-table> -->
				<uni-list>
					<uni-list-item title="小明一共充值" note="总充值4508" showArrow
						thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						thumb-size="base" rightText="总收入45.23" />
					<uni-list-item title="列表左侧带略缩图" note="列表描述信息" showArrow
						thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						thumb-size="base" rightText="默认" />
					<uni-list-item title="列表左侧带略缩图" note="列表描述信息" showArrow
						thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						thumb-size="base" rightText="默认" />
				</uni-list>
			</view>
			<view v-if="current === 1">
				<view class="c_tit">总充值2520，总收入1320</view>
				<uni-list>
					<uni-list-item title="小明充值100元" note="2022-10-25 12:50:01" rightText="收入2.5" />
					<uni-list-item title="小明充值100元" note="2022-10-25 12:50:01" rightText="收入2.5" />
					<uni-list-item title="小明充值100元" note="2022-10-25 12:50:01" rightText="收入2.5" />
					<uni-list-item title="小明充值100元" note="2022-10-25 12:50:01" rightText="收入2.5" />
				</uni-list>
			</view>
			<view v-if="current === 2">
				<view class="c_tit">总充值2500，总收入120</view>
				<uni-list>
					<uni-list-item title="订单号0213465465审核完毕" note="2022-10-25 12:50:01" rightText="提现成功" />
					<uni-list-item title="订单号0213465465申请提现" note="2022-10-25 12:50:01" rightText="等待审核" />
				</uni-list>
			</view>
		</view>
		<view class="back" @click="gotoMy()"><image src="../../static/back.png" mode=""></image></view>
		有：下线成员，可体现余额，已经体现记录，绑定个人银行卡，收益记录，
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['成员列表', '收入记录', '提现记录'],
				styles: [{
										value: 'button',
										text: '按钮',
										checked: true
									},
									{
										value: 'text',
										text: '文字'
									}
				],
				current: 0,
				activeColor: '#007aff',
				styleType: 'text',
				range: ['2021-02-1', '2021-02-1'],
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			maskClick(e){
				console.log('maskClick事件:', e);
			},
			gotoMy(){
				uni.switchTab({
					url:"../my/my"
				})
			},
		}
	}
</script>

<style>
	page{
		background: #f8f8f8;
	}
.main_box{
	padding: 0rpx 24rpx;
}
.header{
	height: 180rpx;
	width: 100%;
	background: linear-gradient(to right, #3681f5, #5e9cff);
	border-radius: 10rpx;
	display: flex;
	color: #fff;
	align-items: center;
}
.header .face{
	margin-left: 40rpx;
}
.header .face image{
	height: 110rpx;
	width: 110rpx;
	margin-right: 16rpx;
}
.header .right{
	flex: 1;
}
.header .right .name{
	font-size: 28rpx;
}
.header .right .money{
	font-size: 20rpx;
	display: flex;
	justify-content: space-between;
}
.header .right  .tixian image{
	width: 40rpx;
	height: 40rpx;
	margin-right: 60rpx;
}
.header .right .mm{
	background: #fff;
	padding: 0rpx 12rpx;
	margin-left: 10rpx;
	color: #3681f5;
	border-radius: 14rpx;
	font-size: 24rpx;
}
/* neirong */
.uni-common-mt{
	background: #fff;
	margin-top: 20rpx;
	border-top-left-radius: 14rpx;
	border-top-right-radius: 14rpx;
}
.content {
		background-color: #fff;
		padding: 20rpx 10rpx;
		border-bottom-left-radius: 14rpx;
		border-bottom-right-radius: 14rpx;
	}
/* 时间搜索 */
.show_time{
	display: flex;
	justify-content: space-between;
}
.show_time .time_put{
	flex: 1;
}
.show_time .search{
	width: 84rpx;
	margin-right: 10rpx;
	text-align: center;
	font-size: 24rpx;
	background: #e8e8e8;
	height: 36rpx;
	color: #909399;
	font-weight: 700;
	margin-top: 16rpx;
	border-radius: 12rpx;
}
.c_tit{
	color: #909399;
	font-size: 24rpx;
	margin-left: 10rpx;
}
.back{
		width: 72rpx;
		height: 72rpx;
		position: fixed;
		bottom: 60rpx;
		right: 30rpx;
		z-index: 999;
	}
	.back image{
		width: 70rpx;
		height: 70rpx;
	}
</style>
