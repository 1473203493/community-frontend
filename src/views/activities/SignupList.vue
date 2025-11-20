<template>
  <div class="page">
    <h2 class="page-title">活动报名数据</h2>
    <div class="toolbar">
      <input v-model="filters.activity" placeholder="活动名称" />
      <button @click="handleSearch">搜索</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>活动名称</th>
            <th>姓名</th>
            <th>学号</th>
            <th>邮箱</th>
            <th>报名时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in pagedData" :key="row.id">
            <td>{{ row.activity }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.studentNo }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.time }}</td>
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
  {
    id: 1,
    activity: '迎新晚会',
    name: '张三',
    studentNo: '20250001',
    email: 'z***@qq.com',
    time: '2025-08-01 10:00'
  },
  {
    id: 2,
    activity: '迎新晚会',
    name: '李四',
    studentNo: '20250002',
    email: 'l***@qq.com',
    time: '2025-08-01 10:05'
  }
]

export default {
  name: 'ActivitySignupList',
  data() {
    return {
      filters: {
        activity: ''
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

.toolbar input {
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
