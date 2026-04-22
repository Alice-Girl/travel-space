<template>
	<view class="content">
		<up-search placeholder="搜索景点" bg-color="#e3e3e3" v-model="keyword"></up-search>
	  <up-swiper v-if="bannerList.length" :list=" bannerList" keyName="image" showTitle radius="8" autoplay="true" height="160"></up-swiper>
		 <up-notice-bar text="项目数据仅展示,非真实数据!"></up-notice-bar>
	</view>
</template>

<script setup>
	import { getBanner } from '../../api/api';
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue';
	
	const keyword = ref()
	const bannerList = ref([])
	
	onLoad(() => {
		getBanner().then(res => {
			console.log(res, 'res=====')
			bannerList.value = res.bannerList
		})
	})
	
	
	
</script>

<style>
	.content {
		padding: 20rpx 20rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
