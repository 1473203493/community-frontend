import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import AdminLayout from '../views/layout/AdminLayout.vue'
import DashboardHome from '../views/dashboard/DashboardHome.vue'
import ClubList from '../views/clubs/ClubList.vue'
import CategoryList from '../views/clubs/CategoryList.vue'
import ActivityList from '../views/activities/ActivityList.vue'
import SignupList from '../views/activities/SignupList.vue'
import UserList from '../views/users/UserList.vue'
import OperationLog from '../views/system/OperationLog.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'DashboardHome',
        component: DashboardHome,
        meta: { title: '首页概览' }
      },
      {
        path: '/clubs',
        name: 'ClubList',
        component: ClubList,
        meta: { title: '社团列表' }
      },
      {
        path: '/club-categories',
        name: 'CategoryList',
        component: CategoryList,
        meta: { title: '社团分类管理' }
      },
      {
        path: '/activities',
        name: 'ActivityList',
        component: ActivityList,
        meta: { title: '活动列表' }
      },
      {
        path: '/activity-signups',
        name: 'SignupList',
        component: SignupList,
        meta: { title: '活动报名数据' }
      },
      {
        path: '/users',
        name: 'UserList',
        component: UserList,
        meta: { title: '用户管理' }
      },
      {
        path: '/operation-logs',
        name: 'OperationLog',
        component: OperationLog,
        meta: { title: '操作日志' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('adminToken')
  if (to.path !== '/login' && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
