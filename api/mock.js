import Mock from 'mockjs'
import pageApi from './mockData/pageApi.js'
// 配置mock 规则
// Mock.mock('http://localhost:5173/apis')
Mock.mock(/api\/user\/getBanner/, 'get', pageApi.getBanner)