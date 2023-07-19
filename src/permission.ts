// 路由鉴权
import router from '@/router'
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'


router.beforeEach((to: any, from: any, next: any) => {
    nprogress.start()
    next()
})  


router.afterEach((to: any, from: any) => {
    nprogress.done()
})