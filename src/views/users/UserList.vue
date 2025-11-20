<template>
  <div class="page">
    <h2 class="page-title">用户管理</h2>
    <div class="toolbar">
      <select v-model="filters.role">
        <option value="">全部角色</option>
        <option value="student">学生</option>
        <option value="club-admin">社团管理员</option>
      </select>
      <select v-model="filters.status">
        <option value="">全部状态</option>
        <option value="enabled">启用</option>
        <option value="disabled">禁用</option>
      </select>
      <input v-model="filters.studentNo" placeholder="学号" />
      <input v-model="filters.email" placeholder="邮箱（模糊搜索）" />
      <button @click="handleSearch">搜索</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>头像</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>角色</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in pagedData" :key="user.id">
            <td>--</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ roleText(user.role) }}</td>
            <td>{{ user.status === 'enabled' ? '启用' : '禁用' }}</td>
            <td>
              <button @click="toggleStatus(user)">
                {{ user.status === 'enabled' ? '禁用' : '启用' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!pagedData.length" class="empty">暂无数据</div>
    </div>
    <div class="pagination">
      <button :disabled="page === 1" @click="page--">上一页</button>
      <span>第 {{ page }} / {{ totalPages }} 页</span>
      <button :disabled="page === totalPages" @click="page++">下一页</button>
    </div>
  </div>
</template>

<script>
const MOCK_DATA = [
  { id: 1, name: '用户1', email: 'x1@qq.com', role: 'student', status: 'enabled' },
  { id: 2, name: '用户2', email: 'x2@qq.com', role: 'student', status: 'enabled' },
  { id: 3, name: '用户3', email: 'x3@qq.com', role: 'club-admin', status: 'disabled' }
]

export default {
  name: 'UserList',
  data() {
    return {
      filters: {
        role: '',
        status: '',
        studentNo: '',
        email: ''
      },
      page: 1,
      pageSize: 10,
      list: MOCK_DATA
    }
  },
  computed: {
    filteredData() {
      return this.list
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredData.length / this.pageSize))
    },
    pagedData() {
      const start = (this.page - 1) * this.pageSize
      return this.filteredData.slice(start, start + this.pageSize)
    }
  },
  methods: {
    handleSearch() {
      this.page = 1
    },
    roleText(role) {
      if (role === 'student') return '学生'
      if (role === 'club-admin') return '社团管理员'
      return role
    },
    toggleStatus(user) {
      const next = user.status === 'enabled' ? 'disabled' : 'enabled'
      user.status = next
      alert(`已将用户 ${user.name} 状态修改为：${next === 'enabled' ? '启用' : '禁用'}`)
    }
  }
}
</script>

<style scoped>
.page-title {
  margin: 0 0 16px;
  font-size: 18px;
}

.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.toolbar input,
.toolbar select {
  padding: 4px 6px;
}

.table-wrapper {
  background: #fff;
  border-radius: 6px;
  padding: 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px 6px;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
}

.pagination {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.empty {
  padding: 16px;
  text-align: center;
  color: #909399;
}
</style>
