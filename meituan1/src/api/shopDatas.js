// api接口统一管理

import {get} from './request'

//商家列表
export const GetShopList = params => get('/data/shopList.json',params)

// 商家详情
export const GetShopDetail = params => get('/data/shopDetail.json',params)
