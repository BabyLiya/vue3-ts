// 路由鉴权
import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

// 同步语句中引入pinia会出错 需要先引入大仓库
import pinia from '@/store'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore(pinia)

router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  document.title = setting.title + '--' + to.meta.title
  let token = userStore.token
  // 访问其他模块时要先拿到用户信息
  let username = userStore.username
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          // 获取用户信息
          await userStore.userInfo()
          next()
        } catch (error) {
          // token过期 / 用户手动修改token / 退出登录
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach((to: any, from: any) => {
  nprogress.done()
})
