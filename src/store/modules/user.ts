// 创建用户相关小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user/index'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from '@/api/user/type'

import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'

import { constantRoute } from '@/router/routes'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, // 生成菜单所需要的路由
    }
  },
  // 异步
  actions: {
    // 用户登录的方法 (返回promise数据 得到数据用async await)
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      console.log(result)
      if (result.code === 200) {
        // 存储token  并本地存储持久化一份token
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
