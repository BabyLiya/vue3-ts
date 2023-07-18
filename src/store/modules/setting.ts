// layout相关配置仓库
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('settingStore',{
    state: () => {
        return {
            fold: false,
            reflash: false
        }
    }
})

export default useLayoutSettingStore