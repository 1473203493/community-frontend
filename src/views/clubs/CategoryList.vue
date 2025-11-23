<template>
  <div class="page">
    <h2 class="page-title">社团管理</h2>
    <div class="toolbar">
      <button @click="addCategory">新增分类</button>
      <button @click="openApproveDialog">社团审批演示</button>
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
    <!-- 简单审批弹窗 -->
    <div v-if="showApprove" class="dialog-mask">
      <div class="dialog">
        <h3>社团审批演示</h3>
        <div style="margin-bottom:8px;">
          <label>社团ID：</label>
          <input v-model="approveForm.clubId" type="number" />
        </div>
        <div style="margin-bottom:8px;">
          <label>审批结果：</label>
          <select v-model="approveForm.status">
            <option value="2">同意</option>
            <option value="4">拒绝</option>
          </select>
        </div>
        <div v-if="approveForm.status == 4" style="margin-bottom:8px;">
          <label>拒绝原因：</label>
          <input v-model="approveForm.rejectReason" />
        </div>
        <div style="color:#f56c6c;min-height:20px;">{{ approveError }}</div>
        <div style="text-align:right;">
          <button @click="submitApprove" :disabled="approveLoading">提交</button>
          <button @click="closeApproveDialog" style="margin-left:8px;">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { approveClub } from '@/api/club/club'

export default {
  name: 'CategoryList',
  data() {
    return {
      list: [
        { id: 1, name: '学术类', order: 1 },
        { id: 2, name: '文艺类', order: 2 },
        { id: 3, name: '体育类', order: 3 }
      ],
      showApprove: false,
      approveForm: {
        clubId: '',
        status: '2',
        rejectReason: ''
      },
      approveLoading: false,
      approveError: ''
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
    },
    openApproveDialog() {
      this.showApprove = true
      this.approveForm = { clubId: '', status: '2', rejectReason: '' }
      this.approveError = ''
    },
    closeApproveDialog() {
      this.showApprove = false
    },
    async submitApprove() {
      this.approveError = ''
      if (!this.approveForm.clubId) {
        this.approveError = '请输入社团ID'
        return
      }
      if (this.approveForm.status == 4 && !this.approveForm.rejectReason) {
        this.approveError = '拒绝时必须填写原因'
        return
      }
      this.approveLoading = true
      try {
        const res = await approveClub({
          clubId: Number(this.approveForm.clubId),
          status: this.approveForm.status,
          rejectReason: this.approveForm.status == 4 ? this.approveForm.rejectReason : undefined
        })
        if (res.code === 0) {
          alert('审批成功')
          this.closeApproveDialog()
        } else {
          this.approveError = res.message || '审批失败'
        }
      } catch (e) {
        this.approveError = e?.message || '请求失败'
      } finally {
        this.approveLoading = false
      }
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
  display: flex;
  gap: 8px;
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
.dialog-mask {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.15);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog {
  background: #fff;
  border-radius: 8px;
  padding: 24px 32px;
  min-width: 320px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
}
</style>
