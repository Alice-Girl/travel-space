<template>
	<view class="content">
		<up-search placeholder="搜索景点" bg-color="#e3e3e3" v-model="keyword"></up-search>
	  <up-swiper v-if="bannerList.length" :list=" bannerList" keyName="image" showTitle radius="8" autoplay="true" height="160"></up-swiper>
		 <up-notice-bar text="项目数据仅展示,非真实数据!"></up-notice-bar>
		 <view class="list">
			 <up-waterfall v-model="flowList" ref="uWaterfallRef">
					<template v-slot:left="{ leftList }">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
							<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
							<view class="demo-title">
								{{ item.title }}
							</view>
							<view class="demo-price">
								{{ item.times }}
							</view>
							<view class="demo-tag">
								<view class="demo-tag-owner">{{ item.tag[0] }}</view>
								<view class="demo-tag-text">{{ item.tag[1] }}</view>
							</view>
							<view class="isDot" v-if="item.isDot">
								{{ item.isDot }}
							</view>
						</view>
					</template>
					<template v-slot:right="{ rightList }">
						<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
							<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
							<view class="demo-title">
								{{ item.title }}
							</view>
							<view class="demo-price">
								{{ item.times }}
							</view>
							<view class="demo-tag">
								<view class="demo-tag-owner">{{ item.tag[0] }}</view>
								<view class="demo-tag-text">{{ item.tag[1] }}</view>
							</view>
							<view class="isDot" v-if="item.isDot">
								{{ item.isDot }}
							</view>
						</view>
					</template>
			 </up-waterfall>
		 </view>
	</view>
</template>

<script setup>
	import { getBanner, getHomeList } from '../../api/api';
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue';
	
	const keyword = ref()
	const bannerList = ref([])
	const uWaterfallRef = ref()
	const flowList = ref([])
	
	
	onLoad(() => {
		getBanner().then(res => {
			console.log(res, 'res=====')
			bannerList.value = res.bannerList
		})
		getHomeList().then(res => {
			flowList.value = res
			console.log(res, '------hoemlist')
		})
	})
	
	
	
</script>

<style lang="scss">
	.content {
		padding: 20rpx 20rpx;
		.list{
			margin: 30rpx 0;
			.demo-warter{
				position: relative;
				margin: 10rpx 10rpx 10rpx 0;
				background-color: #fff;
				border-radius: 16rpx;
				padding: 16rpx;
			}
			.demo-title{
				font-size: 30rpx;
				margin-top: 10rpx;
				color: #777;
			}
			.demo-price{
				font-size: 24rpx;
				margin-top: 10rpx;
				color: #777;
			}
			.demo-tag{
				display: flex;
				margin-top: 10rpx;
				.demo-tag-owner{
					display: flex;
					align-items: center;
					border: 1px solid rgb(252, 163, 129);
					color: #ffaa00;
					font-size: 20rpx;
					padding: 4rpx 14rpx;
					border-radius: 50rpx;
				}
				.demo-tag-text{
					display: flex;
					align-items: center;
					border: 1px solid #00aaff;
					color: #00aaff;
					font-size: 20rpx;
					margin-left: 20rpx;
					border-radius: 50px;
					padding: 4rpx 14rpx;
				}
			}
			.isDot {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				font-size: 24rpx;
				line-height: 32rpx;
				background-color: #ff0000;
				color: #fff;
				text-align: center;
				padding: 4rpx 10rpx;
			}
		}
	}
</style>