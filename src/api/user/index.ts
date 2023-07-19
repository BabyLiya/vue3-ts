import request from '@/utils/request'

// 用户请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USER_INFO = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

// 登录接口
export const reqLogin = (data: any) => {
  return request.post<any, any>(API.LOGIN_URL, data)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get<any,any>(API.USER_INFO)
}

// 退出登录
export const logout = () => {
  return request.post<any,any>(API.LOGOUT_URL)
}