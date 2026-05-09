<template>
	<view class="content">
		<view class="topBox">
			<view class="setBox">
				<view class="set-left">
					<uni-icons type="calendar" size="30" color="#fff"></uni-icons>
					<view class="txt">签到</view>
				</view>
				<view class="set-right">
					<uni-icons type="gear" size="30" color="#fff"></uni-icons>
					<uni-icons type="chat" size="30" color="#fff"></uni-icons>
				</view>
			</view>
			<view class="users" @click="setFun">
				<view class="u-top">
					<template v-if="!userInfo.nickName">
						<image
							src="/static/tt.jpg"
							mode="aspectFill"
						>
						</image>
						<view class="tit">注册/登录</view>
					</template>
					<template v-else>
						<image
							:src="userInfo.avatarUrl"
							mode="aspectFill"
						>
						</image>
						<view class="tit">{{ userInfo.nickName }}</view>
					</template>
				</view>
				<view class="u-bottom">
					<view class="u-item">
						<view class="u-num">12</view>
						<view class="u-tit">点赞</view>
					</view>
					<view class="u-item">
						<view class="u-num">12</view>
						<view class="u-tit">喜欢</view>
					</view>
					<view class="u-item">
						<view class="u-num">12</view>
						<view class="u-tit">浏览</view>
					</view>
					<view class="u-item">
						<view class="u-num">12</view>
						<view class="u-tit">收藏</view>
					</view>
				</view>
			</view>
		</view>
		<view class="listBox"></view>
		<!-- 弹出层 -->
		<up-popup :show="show" @close="close" @open="open" closeable  round="20">
			<view class="popup">
				<view class="title"></view>
				<view class="flex">
					<view class="label">获取用户头像：</view>
					<button class="avatar-warpper" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
						<image class="avatar" :src="userInfo.avatarUrl"></image>
					</button>
				</view>
				<view class="flex">
					<view class="label">获取用户昵称：</view>
					<input @input="changeName" type="nickname"/>
				</view>
				<button type="primary" @click="userSubmit">确定</button>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
	import {ref, reactive} from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { login, getUserInfo } from '../../api/api.js'
	const userInfo = reactive({
		nickName: '',
		avatarUrl: ''
	})
	
	const setFun= () => {
		// 确认提醒
		uni.showModal({
			title: '温馨提示',
			content: '亲，授权微信登录后才能正常的使用小程序',
			success(res) {
				if(res.confirm) {
					// uni.getUserProfile({
					// 	desc: '获取用户头像和昵称',
					// 	success(res){
					// 		console.log(res, '----res--')
					// 	},
					// 	fail(err) {
					// 		console.log(err, '--err--')
					// 	}
					// })
					
					// login
					uni.login({
						success: async (data) => {
							const { token } = await login(data.code)
							console.log(data, '-data---')
							console.log(token, 'token')
							// token 获取用户信息
							uni.setStorageSync('token', token)
							// 根据token获取用户信息
							const { avatarUrl, nickName }  = await getUserInfo()
							console.log(avatarUrl, nickName)
							show.value = true
						}
					})
				}
			}
		})
	}

	const show = ref(false)
	
	const close = () => {
		console.log('close')
		show.value = false
	}
	const userSubmit = () => {
		show.value = false
	}
	const onChooseavatar = (e) => {
		console.log('onChooseavatar')
		userInfo.avatarUrl = e.detail.avatarUrl
		console.log(e, '---shiian--')
	}
	const changeName = () => {
		console.log('changeName')
		userInfo.nickName = e.detail.nickName
		console.log(e, 'changeName')
	}
	
</script>

<style lang="scss" scoped>
.content{
	height: 100vh;
	background-color: #f5f5f5;
	.topBox{
		width: 100%;
		position: relative;
		z-index: 1;
		overflow: hidden;
		padding: 40rpx 20rpx 40rpx;
		box-sizing: border-box;
	}
	.topBox::after{
		content: '';
		width: 140%;
		height: 200rpx;
		position: absolute;
		z-index: -1;
		top: 0;
		left: -20%;
		background-color: #00aaff;
		border-radius: 0 0 50% 50%;
	}
	.setBox{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.set-left{
			width: 18%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.txt{
			color: #ffff;
			font-size: 30rpx;
		}
	}
	.users{
		margin-top: 35rpx;
		padding: 30rpx;
		box-sizing: border-box;
		height: 280rpx;
		background-color: #fff;
		box-shadow: 1rpx 10rpx 20rpx #ececec;
		border-radius: 16rpx;
		.u-top{
			display: flex;
			justify-content: flex-strat;
			align-items: center;
			margin-bottom: 30rpx;
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.tit {
				font-size: 30rpx;
				font-weight: 700;
				color: #333;
			}
		}
		.u-bottom{
			display: flex;
			justify-content: space-around;
			align-items: center;
			.u-item{
				text-align: center;
				.u-num {
					color: #000;
					font-size: 22rpx;
					font-weight: 700;
				}
				.u-tit{
					color: #757575;
					font-size: 26rpx;
					margin-top: 10rpx;
				}
			}
		}
	}
	.popup{
		padding: 20rpx 20rpx 0 0;
		.title {
			margin-bottom: 20rpx;
			font-size: 40rpx;
			text-align: center;
		}
		.flex{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px solid #f5f5f5;
			padding: 24rpx 0;
		}
		image {
			width: 70rpx;
			height: 70rpx;
		}
		.avatar-warpper {
			border: none;
			border-radius: 10rpx;
			width: 70rpx;
			height: 70rpx;
			margin-left: 20rpx;
			padding: 0;
		}
	}
}
</style>