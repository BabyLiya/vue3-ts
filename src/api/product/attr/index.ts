import request from '@/utils/request'
import type {CategoryResponseData, AttrResponseData, Attr} from './type'
enum API {
  ONE_URL = '/admin/product/getCategory1',
  TWO_URL = '/admin/product/getCategory2/',
  THREE_URL = '/admin/product/getCategory3/',
  ATTR_lIST = '/admin/product/attrInfoList/',
  SAVE_ATTR = '/admin/product/saveAttrInfo',
  DELETE_ATTR = '/admin/product/deleteAttr/'
}

export const reqOne = () => {
  return request.get<any, CategoryResponseData>(API.ONE_URL)
}

export const reqTwo = (id: number | string) => {
  return request.get<any, CategoryResponseData>(API.TWO_URL + id)
}

export const reqThree = (id: number | string) => {
  return request.get<any, CategoryResponseData>(API.THREE_URL + id)
}

export const reqList = (
  id1: number | string,
  id2: number | string,
  id3: number | string,
) => {
  return request.get<any, any>(API.ATTR_lIST + `${id1}/${id2}/${id3}`)
}

export const saveList = (data: Attr) => {
  return request.post<any,any>(API.SAVE_ATTR,data)
}

export const reqDelete = (id: number | string) => {
  return request.delete<any,any>(API.DELETE_ATTR + id)
}
