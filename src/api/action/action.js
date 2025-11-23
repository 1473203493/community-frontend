import http from '@/api/http'

// 分页查询操作日志
export function getOperationLogList(data) {
  return http.post('/admin/operation/page', data)
}
