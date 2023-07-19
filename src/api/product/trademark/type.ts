export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 已有品牌的ts类型
export interface Trademark {
  id?: number
  tmName: string
  logoUrl: string
}

// 全部品牌数据的ts类型
export type Records = Trademark[]

// 获取已有全部品牌的ts类型
export interface TrademarkResponse extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
