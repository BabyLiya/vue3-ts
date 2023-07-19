// 用户相关数据的ts类型

// 用户登录接口携带参数的ts类型
export interface loginData {
  username: string
  password: string
}

// 接口返回数据类型 （都有的ts类型--不一定都带token--成功才有）
export interface responseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回数据类型
export interface loginResponseData extends responseData {
  data: string
}

// 定义获取信息返回的数据类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
