// 品牌管理接口
import request from '@/utils/request'
import { TrademarkResponse } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

export const reqTrademark = (page: number, limit: number) => {
  return request.get<any, TrademarkResponse>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}
