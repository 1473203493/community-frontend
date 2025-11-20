<template>
  <div class="page">
    <h2 class="page-title">操作日志</h2>
    <div class="toolbar">
      <input v-model="filters.operator" placeholder="操作人" />
      <input v-model="filters.ip" placeholder="IP 地址" />
      <button @click="handleSearch">搜索</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>操作人</th>
            <th>角色</th>
            <th>操作时间</th>
            <th>操作内容</th>
            <th>IP 地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in pagedData" :key="log.id">
            <td>{{ log.operator }}</td>
            <td>{{ log.role }}</td>
            <td>{{ log.time }}</td>
            <td>{{ log.content }}</td>
            <td>{{ log.ip }}</td>
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
    operator: '用户1',
    role: '学生',
    time: '2025-11-01 14:23',
    content: '修改关联邮箱',
    ip: '177.78.88.109'
  },
  {
    id: 2,
    operator: '用户2',
    role: '平台管理员',
    time: '2025-11-01 14:23',
    content: '修改关联邮箱',
    ip: '177.78.88.109'
  }
]

export default {
  name: 'OperationLogList',
  data() {
    return {
      filters: {
        operator: '',
        ip: ''
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
