// 对外暴露插件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './pagination/index.vue'

const allGlobalComponent: any = { SvgIcon, Pagination }

export default {
  // 插件必须为install方法
  install(app: any) {
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGlobalComponent[key])
    })
  },
}
