<template>
  <div class="login-page">
    <div class="login-left">
      <h1 class="system-title">学校社团管理平台</h1>
      <p class="system-subtitle">PC 端后台管理</p>
    </div>
    <div class="login-right">
      <div class="login-card">
        <h2 class="login-title">管理员登录</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-item">
            <label>账号</label>
            <input v-model="form.account" type="text" placeholder="请输入账号" />
          </div>
          <div class="form-item">
            <label>密码</label>
            <input v-model="form.password" type="password" placeholder="请输入密码" />
          </div>
          <div class="form-item form-row">
            <div class="form-row-main">
              <label>验证码</label>
              <input v-model="form.captcha" type="text" placeholder="请输入右侧验证码" />
            </div>
            <div class="captcha-box" @click="generateCaptcha" title="点击刷新验证码">
              <img v-if="captchaImg" :src="captchaImg" alt="验证码" style="height:32px;vertical-align:middle;" />
              <span v-else>加载中</span>
            </div>
          </div>
          <div class="form-item form-row">
            <label class="checkbox">
              <input v-model="form.remember" type="checkbox" />
              7 天内免登录
            </label>
            <a href="javascript:void(0)" class="link" @click="goReset">忘记密码？</a>
          </div>
          <button class="btn-primary" type="submit" :disabled="loading">
            {{ loading ? '正在登录…' : '登录' }}
          </button>
          <p v-if="error" class="error-text">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginAdmin, getValidateCode } from '@/api/login/login'

export default {
  name: 'AdminLoginPage',
  data() {
    return {
      form: {
        account: '',
        password: '',
        captcha: '',
        remember: false
      },
      error: '',
      loading: false,
      captchaImg: '',
      codeKey: ''
    }
  },
  created() {
    this.generateCaptcha()
  },
  methods: {
    async handleSubmit() {
      this.error = ''
      if (!this.form.account || !this.form.password || !this.form.captcha) {
        this.error = '请完整填写账号、密码和验证码'
        return
      }
      this.loading = true
      try {
        const res = await loginAdmin({
          username: this.form.account,
          password: this.form.password,
          captcha: this.form.captcha,
          codeKey: this.codeKey
        })
        if (res.code === 0 && res.data && res.data.token) {
          localStorage.setItem('adminToken', res.data.token)
          this.$router.push('/')
        } else {
          this.error = res.message || '登录失败，请稍后重试'
          this.generateCaptcha()
        }
      } catch (err) {
        this.error = err?.message || err?.msg || '登录失败，请稍后重试'
        this.generateCaptcha()
      } finally {
        this.loading = false
        this.form.captcha = ''
      }
    },
    async generateCaptcha() {
      try {
        const res = await getValidateCode()
        if (res.code === 0 && res.data) {
          // 确保 codeValue 是有效的 Base64 图片数据
          const imgData = res.data.codeValue
          if (imgData && imgData.startsWith('data:image')) {
            this.captchaImg = imgData
            this.codeKey = res.data.codeKey
          } else {
            console.warn('验证码图片数据格式异常:', imgData)
            this.captchaImg = ''
            this.codeKey = ''
          }
        } else {
          this.captchaImg = ''
          this.codeKey = ''
        }
      } catch (error) {
        console.error('获取验证码失败:', error)
        this.captchaImg = ''
        this.codeKey = ''
      }
    }
,
    goReset() {
      alert('请联系系统管理员重置密码或在后续完善密码重置页面')
    }
  }
}
</script>


<style scoped>
.login-page {
  display: flex;
  height: 100vh;
}

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #2f74ff, #4b9bff);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.system-title {
  font-size: 32px;
  margin-bottom: 8px;
}

.system-subtitle {
  font-size: 16px;
  opacity: 0.9;
}

.login-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 360px;
  padding: 32px 40px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 35, 95, 0.12);
  border-radius: 8px;
}

.login-title {
  margin: 0 0 24px;
  font-size: 20px;
  text-align: center;
}

.form-item {
  margin-bottom: 16px;
  font-size: 14px;
}

.form-item label {
  display: block;
  margin-bottom: 6px;
}

.form-item input[type='text'],
.form-item input[type='password'] {
  width: 100%;
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  font-size: 14px;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-row-main {
  flex: 1;
  margin-right: 8px;
}

.captcha-box {
  width: 80px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 4px;
}

.btn-primary {
  width: 100%;
  margin-top: 8px;
  padding: 10px 0;
  border: none;
  border-radius: 4px;
  background-color: #2f74ff;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #255dd1;
}

.link {
  font-size: 13px;
  color: #2f74ff;
}

.error-text {
  margin-top: 8px;
  font-size: 13px;
  color: #f56c6c;
}
</style>
