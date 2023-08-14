import request from '@/utils/request'
import type { SpuResponseData } from './type'

enum API {
    // 获取已有的SPU
    SPU_DATA = '/admin/product/',
    SPU_DELETE = '/admin/product/deleteSpu/'
}

// 获取已有的spu  (page页)
export const reqData = (page: number, limit: number, category3Id: string | number) => {
    return request.get<any,SpuResponseData>(API.SPU_DATA + `${page}/${limit}?category3Id=${category3Id}`)
}