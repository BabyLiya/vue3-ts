// 品牌管理接口
import request from '@/utils/request'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

export const reqTrademark = (page: number, limit: number) => {
  return request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)
}
