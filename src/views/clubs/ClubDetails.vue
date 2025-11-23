<template>
  <div class="club-details-page">
    <h2>社团详情</h2>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="club">
      <ul class="club-info-list">
        <li><strong>社团ID：</strong>{{ club.clubId }}</li>
        <li><strong>社团名称：</strong>{{ club.name }}</li>
        <li><strong>分类：</strong>{{ club.categoryName }}</li>
        <li><strong>简介：</strong>{{ club.description }}</li>
        <li><strong>章程：</strong>{{ club.charter }}</li>
        <li><strong>状态：</strong>{{ club.status }}</li>
        <li><strong>创建时间：</strong>{{ club.createdAt }}</li>
        <li><strong>负责人姓名：</strong>{{ club.founderName }}</li>
        <li><strong>负责人邮箱：</strong>{{ club.founderEmail }}</li>
      </ul>
    </div>
    <div v-else>暂无数据</div>
  </div>
</template>

<script>
import { getClubDetails } from '@/api/club/club'

export default {
  name: 'ClubDetails',
  data() {
    return {
      club: null,
      loading: false,
      error: ''
    }
  },
  created() {
    this.fetchDetails()
  },
  methods: {
    async fetchDetails() {
      const clubId = this.$route.params.id
      if (!clubId) {
        this.error = '未指定社团ID'
        return
      }
      this.loading = true
      try {
        const res = await getClubDetails(clubId)
        if (res.code === 0 && res.data) {
          this.club = res.data
        } else {
          this.error = res.message || '获取社团详情失败'
        }
      } catch (e) {
        this.error = e?.message || '请求失败'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.club-details-page {
  max-width: 600px;
  margin: 32px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  padding: 32px 40px;
}
.club-info-list {
  list-style: none;
  padding: 0;
}
.club-info-list li {
  margin-bottom: 12px;
  font-size: 15px;
}
.error {
  color: #f56c6c;
}
</style>
