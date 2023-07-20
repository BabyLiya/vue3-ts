// 品牌管理接口
import request from '@/utils/request'
import { TrademarkResponse, Trademark } from './type'

enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 获取新增接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 获取修改接口
  EDITTRADEMARK_URL = '/admin/product/baseTrademark/update',
}

export const reqTrademark = (page: number, limit: number) => {
  return request.get<any, TrademarkResponse>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}

// 添加/修改已有接口的方法 (携带id / 不携带id)
export const reqAddTrademark = (data: Trademark) => {
  if (data.id) {
    // 修改已有商品数据
    return request.put<any, any>(API.EDITTRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
