<template>
  <div class="page">
    <h2 class="page-title">首页概览</h2>
    <div class="card-row">
      <div class="card">总社团数：12</div>
      <div class="card">总活动数：34</div>
      <div class="card">注册用户数：256</div>
    </div>
    <p class="tip">此页为后台概览，后续可根据实际统计接口进行替换。</p>
  </div>
</template>

<script>
export default {
  name: 'DashboardHome'
}
</script>

<style scoped>
.page-title {
  margin: 0 0 16px;
  font-size: 18px;
}

.card-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.card {
  flex: 1;
  padding: 16px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.tip {
  font-size: 13px;
  color: #909399;
}
</style>
