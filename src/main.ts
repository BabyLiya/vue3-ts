import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
// 引入模板全局样式
import '@/styles/index.scss'
import router from './router/index'
import pinia from './store'

// 引入自定义插件对象： 注册整个项目全局组件
import globalComponent from '@/components'

import './permission'

import App from '@/App.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(globalComponent)

app.use(router)
app.use(pinia)

app.mount('#app')
