import http from '@/api/http'

// 获取社团详情
export function getClubDetails(clubId) {
  return http.get(`/admin/club/${clubId}`)
}

// 获取社团列表
export function getClubList(params) {
  return http.get('/admin/club/list', { params })
}

// 社团审批操作
export function approveClub(data) {
  return http.post('/admin/club/approve', data)
}