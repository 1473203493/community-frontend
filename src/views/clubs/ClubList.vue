<template>
  <div class="page">
    <h2 class="page-title">社团列表</h2>
    <div class="toolbar">
      <select v-model="filters.status">
        <option value="">全部状态</option>
        <option value="1">待审批</option>
        <option value="2">正常</option>
        <option value="3">冻结</option>
        <option value="4">拒绝</option>
      </select>
      <input v-model="filters.categoryId" placeholder="分类ID" style="width:90px" />
      <input v-model="filters.founderEmail" placeholder="负责人邮箱（模糊搜索）" />
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
          <tr v-for="club in list" :key="club.clubId">
            <td>{{ club.name }}</td>
            <td>{{ club.founderName }}</td>
            <td>{{ club.createdAt }}</td>
            <td>
              <span :class="['tag', 'tag-' + statusClass(club.status)]">
                {{ statusText(club.status) }}
              </span>
            </td>
            <td>
              <button @click="viewDetail(club)">查看</button>
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
import { getClubList } from '@/api/club/club'

export default {
  name: 'ClubList',
  data() {
    return {
      filters: {
        status: '',
        categoryId: '',
        founderEmail: ''
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
          status: this.filters.status,
          categoryId: this.filters.categoryId,
          founderEmail: this.filters.founderEmail
        }
        const res = await getClubList(params)
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
    statusText(status) {
      // 1:待审批 2:正常 3:冻结 4:拒绝
      if (status == 1) return '待审批'
      if (status == 2) return '正常'
      if (status == 3) return '冻结'
      if (status == 4) return '拒绝'
      return status
    },
    statusClass(status) {
      if (status == 1) return 'pending'
      if (status == 2) return 'normal'
      if (status == 3) return 'frozen'
      if (status == 4) return 'rejected'
      return ''
    },
    viewDetail(row) {
      this.$router.push({ name: 'ClubDetails', params: { id: row.clubId } })
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
