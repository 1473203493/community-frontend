import http from '@/api/http'

// 管理员登录
export function loginAdmin(data) {
  return http.post('/admin/login', data)
}

// 获取验证码
export function getValidateCode() {
  return http.get('/admin/generateValidateCode')
}
