// 服务器全部接口返回的数据类型(公共类型)
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 已有的SPU数据的ts类型
export interface SpuData {
  category3Id: number
  description: string
  id?: number
  spuImageList: null // 照片墙数据
  spuName: string
  spuPosterList: null
  spuSaleAttrList: null // spu销售属性
  tmId: number
}

// 数组： 元素都是已有的spu数据类型
export type Records = SpuData[]

// SPU接口返回的ts数据类型
export interface SpuResponseData extends ResponseData {
  data: {
    records: Records
    countId: null
    current: 1
    hitCount: false
    maxLimit: null
    optimizeCountSql: true
    orders: []
    pages: 2
    searchCount: boolean
    size: 3
    total: number
  }
}
