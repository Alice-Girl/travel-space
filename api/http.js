
let baseUrl = 'https://m1.apifoxmock.com/m1/4728220-0-default/api'
// let baseUrl = 'http://159.75.169.224:4200/api' 

/**
 * 通过环境来判断 开发环境走本地Mock代理
 * 若需要在外部H5也能访问接口，需要下载mockjs 插件
**/
if(process.env.NODE_ENV === 'development') {
	// baseUrl = 'http://localhost:5173/api'
	baseUrl = 'https://m1.apifoxmock.com/m1/4728220-0-default/api'
} else {
	baseUrl = 'https://m1.apifoxmock.com/m1/4728220-0-default/api'
}
export default function http (url, data={}, method = 'GET') {
	// 对外支持链式调用
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl+url,
			data,
			method,
			header: {
				'token': uni.getStorageSync('token') || ''
			},
			success: res => {
				// http 状态码
				if(res.statusCode == 200) {
					if(res.data.code == 1) {
						resolve(res.data.data)
					} else if(res.data.code ==0) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						reject(res.data.msg)
					}
				}
			},
			fail: () => {
				uni.showToast({
					title: '服务器请求异常！',
					icon: 'none'
				})
			}
		})
	})
}