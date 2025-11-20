<template>
  <div class="layout">
    <aside class="sider">
      <div class="logo">社团管理后台</div>
      <nav class="menu">
        <router-link to="/dashboard" class="menu-item" :class="isActive('/dashboard')">首页概览</router-link>
        <div class="menu-group">社团管理</div>
        <router-link to="/clubs" class="menu-item" :class="isActive('/clubs')">社团列表</router-link>
        <router-link to="/club-categories" class="menu-item" :class="isActive('/club-categories')">分类管理</router-link>
        <div class="menu-group">活动管理</div>
        <router-link to="/activities" class="menu-item" :class="isActive('/activities')">活动列表</router-link>
        <router-link to="/activity-signups" class="menu-item" :class="isActive('/activity-signups')">报名数据</router-link>
        <div class="menu-group">系统管理</div>
        <router-link to="/users" class="menu-item" :class="isActive('/users')">用户管理</router-link>
        <router-link to="/operation-logs" class="menu-item" :class="isActive('/operation-logs')">操作日志</router-link>
      </nav>
    </aside>
    <div class="main">
      <header class="header">
        <div class="header-left">学校社团管理平台 - 后台管理</div>
        <div class="header-right">
          <span class="time">{{ today }}</span>
          <span class="user">当前用户：{{ adminName }}</span>
          <button class="link-btn" @click="logout">退出登录</button>
        </div>
      </header>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      adminName: '学校管理员',
      today: ''
    }
  },
  created() {
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    this.today = `${y}-${m}-${d} ${hh}:${mm}`
  },
  methods: {
    isActive(path) {
      return this.$route.path === path ? 'active' : ''
    },
    logout() {
      localStorage.removeItem('adminToken')
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sider {
  width: 220px;
  background-color: #001529;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.menu {
  flex: 1;
  padding: 12px 0;
}

.menu-group {
  padding: 8px 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.menu-item {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.menu-item.active,
.menu-item:hover {
  background-color: #1890ff;
  color: #fff;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.header {
  height: 60px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-left {
  font-size: 15px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
}

.time {
  color: #909399;
}

.user {
  color: #303133;
}

.link-btn {
  border: none;
  background: none;
  color: #2f74ff;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 16px 24px;
  overflow: auto;
}
</style>
