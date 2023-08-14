// 商品分类
import { defineStore } from 'pinia'
import { reqOne, reqTwo, reqThree } from '@/api/product/attr'
import type { CategoryResponseData, AttrResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/types'



let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c2Arr: [],
      c3Arr: [],
      c1Id: '',
      c2Id: '',
      c3Id: ''
    }
  },
  actions: {
    async getOne() {
      let res: CategoryResponseData = await reqOne()
      if (res.code === 200) {
        this.c1Arr = res.data
      }
    },
    async getTwo() {
      let res: CategoryResponseData = await reqTwo(this.c1Id)
      if (res.code === 200) {
        this.c2Arr = res.data
      }
    },
    async getThree() {
      let res: CategoryResponseData = await reqThree(this.c2Id)
      if (res.code === 200) {
        this.c3Arr = res.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
