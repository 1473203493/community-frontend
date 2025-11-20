<template>
  <div class="page">
    <h2 class="page-title">社团列表</h2>
    <div class="toolbar">
      <select v-model="filters.status">
        <option value="">全部状态</option>
        <option value="pending">待审批</option>
        <option value="normal">正常</option>
        <option value="frozen">冻结</option>
      </select>
      <select v-model="filters.category">
        <option value="">全部类别</option>
        <option value="academic">学术类</option>
        <option value="sport">体育类</option>
      </select>
      <input v-model="filters.ownerEmail" placeholder="负责人邮箱（模糊搜索）" />
      <button @click="handleSearch">搜索</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>社团名称</th>
            <th>负责人</th>
            <th>成立时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="club in pagedData" :key="club.id">
            <td>{{ club.name }}</td>
            <td>{{ club.owner }}</td>
            <td>{{ club.createdAt }}</td>
            <td>
              <span :class="['tag', 'tag-' + club.status]">
                {{ statusText(club.status) }}
              </span>
            </td>
            <td>
              <button v-if="club.status === 'pending'" @click="approve(club)">审批</button>
              <button v-else @click="viewDetail(club)">查看</button>
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
  { id: 1, name: '社团 A', owner: '张三', createdAt: '2021-05-12', status: 'normal' },
  { id: 2, name: '社团 B', owner: '李四', createdAt: '2022-03-01', status: 'pending' },
  { id: 3, name: '社团 C', owner: '王五', createdAt: '2020-11-20', status: 'frozen' }
]

export default {
  name: 'ClubList',
  data() {
    return {
      filters: {
        status: '',
        category: '',
        ownerEmail: ''
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
      if (status === 'normal') return '正常'
      if (status === 'frozen') return '冻结'
      return status
    },
    approve(row) {
      alert(`审批社团：${row.name}`)
    },
    viewDetail(row) {
      alert(`查看社团详情：${row.name}`)
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

.tag {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.tag-pending {
  background: #fff7e6;
  color: #d48806;
}

.tag-normal {
  background: #f6ffed;
  color: #389e0d;
}

.tag-frozen {
  background: #fff1f0;
  color: #cf1322;
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
