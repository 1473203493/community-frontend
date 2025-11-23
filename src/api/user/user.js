import http from '@/api/http'

// 分页查询用户信息
export function getUserList(params) {
  return http.get('/admin/getUsersList', { params })
}

// 启用/禁用用户账号
export function updateUserStatus(params) {
  return http.put('/admin/updateUserStatus', null, { params })
}
