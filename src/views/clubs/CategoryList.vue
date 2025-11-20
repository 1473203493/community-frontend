<template>
  <div class="page">
    <h2 class="page-title">社团分类管理</h2>
    <div class="toolbar">
      <button @click="addCategory">新增分类</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>分类名称</th>
            <th>排序</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.order }}</td>
            <td>
              <button @click="edit(item)">编辑</button>
              <button @click="remove(item)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      list: [
        { id: 1, name: '学术类', order: 1 },
        { id: 2, name: '文艺类', order: 2 },
        { id: 3, name: '体育类', order: 3 }
      ]
    }
  },
  methods: {
    addCategory() {
      alert('新增分类，后续可使用弹窗表单实现')
    },
    edit(item) {
      alert(`编辑分类：${item.name}`)
    },
    remove(item) {
      alert(`删除分类：${item.name}`)
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
  margin-bottom: 12px;
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
</style>
