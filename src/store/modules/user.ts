// 创建用户相关小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user/index'
import { REMOVE_TOKEN } from '@/utils/token'
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
      username: '',
      avatar: '',
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
    // 获取用户信息
    async userInfo() {
      // 获取用户信息存储到仓库中
      let res = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
      } else {
      }
    },
    // 退出登录
    userLogout() {
      ;(this.token = ''), (this.username = ''), (this.avatar = '')
      REMOVE_TOKEN()
    },
  },
  getters: {},
})

export default useUserStore
