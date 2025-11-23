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
          <tr v-for="user in list" :key="user.userId">
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
      <div v-if="!list.length && !loading" class="empty">暂无数据</div>
      <div v-if="loading" class="empty">加载中...</div>
    </div>
    <div class="pagination">
      <button :disabled="pageNum === 1" @click="changePage(pageNum-1)">上一页</button>
      <span>第 {{ pageNum }} / {{ totalPages }} 页</span>
      <button :disabled="pageNum === totalPages" @click="changePage(pageNum+1)">下一页</button>
      <span style="margin-left:8px;">共 {{ total }} 条</span>
    </div>
  </div>
</template>

<script>
import { getUserList, updateUserStatus } from '@/api/user/user'

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
      pageNum: 1,
      pageSize: 10,
      total: 0,
      list: [],
      loading: false
    }
  },
  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.total / this.pageSize))
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    async fetchList() {
      this.loading = true
      try {
        const params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          role: this.filters.role,
          status: this.filters.status,
          studentNo: this.filters.studentNo,
          email: this.filters.email
        }
        const res = await getUserList(params)
        if (res.code === 0 && res.data) {
          this.list = res.data.list || []
          this.total = res.data.total || 0
        } else {
          this.list = []
          this.total = 0
        }
      } catch (e) {
        this.list = []
        this.total = 0
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.pageNum = 1
      this.fetchList()
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return
      this.pageNum = page
      this.fetchList()
    },
    roleText(role) {
      if (role === 'student') return '学生'
      if (role === 'club-admin') return '社团管理员'
      return role
    },
    async toggleStatus(user) {
      const next = user.status === 'enabled' ? 'disabled' : 'enabled'
      try {
        this.loading = true
        const res = await updateUserStatus({ userId: user.userId, status: next })
        if (res.code === 0) {
          this.$message && this.$message.success ? this.$message.success('操作成功') : alert('操作成功')
          this.fetchList()
        } else {
          this.$message && this.$message.error ? this.$message.error(res.message || '操作失败') : alert(res.message || '操作失败')
        }
      } catch (e) {
        this.$message && this.$message.error ? this.$message.error('请求失败') : alert('请求失败')
      } finally {
        this.loading = false
      }
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
