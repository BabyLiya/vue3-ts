import axios from 'axios'
import { ElMessage } from 'element-plus'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带/api
  timeout: 5000, // 发请求超时的时间设置
})

request.interceptors.request.use((config) => {
  // header请求头给服务端携带公共参数
  return config
})

request.interceptors.response.use(
  (response) => {
    // 成功回调 (可以简化返回数据)
    return response.data
  },
  (error) => {
    // 失败回调 (可处理http网络错误)
    // 定义一个变量存储网络错误信息
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

// 对外暴露
export default request
