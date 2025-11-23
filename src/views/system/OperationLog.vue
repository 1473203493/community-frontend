<template>
  <div class="page">
    <h2 class="page-title">操作日志</h2>
    <div class="toolbar">
      <input v-model="filters.adminNo" placeholder="管理员编号" />
      <input v-model="filters.studentNo" placeholder="学生编号" />
      <input v-model="filters.ipAddress" placeholder="IP 地址" />
      <button @click="handleSearch">搜索</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>操作人编号</th>
            <th>角色</th>
            <th>操作时间</th>
            <th>操作内容</th>
            <th>IP 地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in list" :key="log.logId">
            <td>{{ log.adminNo || log.studentNo }}</td>
            <td>{{ log.role }}</td>
            <td>{{ log.createdAt }}</td>
            <td>{{ log.action }}</td>
            <td>{{ log.ipAddress }}</td>
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
import { getOperationLogList } from '@/api/action/action'

export default {
  name: 'OperationLogList',
  data() {
    return {
      filters: {
        adminNo: '',
        studentNo: '',
        ipAddress: ''
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
          adminNo: this.filters.adminNo,
          studentNo: this.filters.studentNo,
          ipAddress: this.filters.ipAddress
        }
        const res = await getOperationLogList(params)
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
