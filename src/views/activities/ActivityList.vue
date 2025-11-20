<template>
  <div class="page">
    <h2 class="page-title">活动列表</h2>
    <div class="toolbar">
      <select v-model="filters.status">
        <option value="">全部状态</option>
        <option value="pending">待审批</option>
        <option value="ongoing">进行中</option>
        <option value="finished">已结束</option>
      </select>
      <input v-model="filters.name" placeholder="活动名称" />
      <input v-model="filters.club" placeholder="举办社团" />
      <button @click="handleSearch">搜索</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>活动名称</th>
            <th>举办社团</th>
            <th>时间</th>
            <th>地点</th>
            <th>报名人数</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pagedData" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.club }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.place }}</td>
            <td>{{ item.signupCount }}</td>
            <td>{{ statusText(item.status) }}</td>
            <td>
              <button v-if="item.status === 'pending'" @click="approve(item)">审批</button>
              <button v-else @click="view(item)">查看</button>
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
  {
    id: 1,
    name: '迎新晚会',
    club: '文艺社',
    time: '2025-09-01 19:00',
    place: '礼堂',
    signupCount: 120,
    status: 'pending'
  },
  {
    id: 2,
    name: '学术讲座',
    club: '学术社',
    time: '2025-10-10 14:00',
    place: '报告厅',
    signupCount: 80,
    status: 'ongoing'
  }
]

export default {
  name: 'ActivityList',
  data() {
    return {
      filters: {
        status: '',
        name: '',
        club: ''
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
    statusText(status) {
      if (status === 'pending') return '待审批'
      if (status === 'ongoing') return '进行中'
      if (status === 'finished') return '已结束'
      return status
    },
    approve(row) {
      alert(`审批活动：${row.name}`)
    },
    view(row) {
      alert(`查看活动：${row.name}`)
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
